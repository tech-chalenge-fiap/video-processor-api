import { CloudStorage } from "../shared/services/CloudStorage";
import { VideoRepository } from "../shared/repositories/VideoRepository";
import { NotificationService } from "../shared/services/NotificationService";
import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs-extra";
import * as path from "path";
import tempy from "tempy";
import archiver from "archiver";
import { logger } from "../shared/utils/logger";

const execAsync = promisify(exec);

export async function processVideoMessage(
  message: string,
  cloudStorage: CloudStorage,
  videoRepo: VideoRepository,
  notificationService: NotificationService
): Promise<void> {
  const { videoId, s3Key, userId } = JSON.parse(message);

  try {
    // Atualiza status para PROCESSING
    await videoRepo.update(videoId, { status: "PROCESSING" });

    // 1. Download do vídeo do S3
    const videoBuffer = await cloudStorage.download(s3Key);
    const tempDir = tempy.directory();
    const videoPath = path.join(tempDir, "input.mp4");
    await fs.writeFile(videoPath, videoBuffer);

    // 2. Processar vídeo com FFmpeg (exemplo: extrair frames)
    const framesDir = path.join(tempDir, "frames");
    await fs.mkdir(framesDir);

    await execAsync(
      `ffmpeg -i "${videoPath}" -vf "fps=1" "${path.join(framesDir, "frame-%03d.jpg")}"`
    );

    // 3. Criar ZIP dos frames
    const zipPath = path.join(tempDir, "output.zip");
    await createZip(framesDir, zipPath);

    // 4. Upload do ZIP para S3
    const zipKey = `${s3Key}-frames.zip`;
    const zipBuffer = await fs.readFile(zipPath);
    await cloudStorage.upload(zipBuffer, zipKey);

    // 5. Atualizar status para COMPLETED
    await videoRepo.update(videoId, {
      status: "COMPLETED",
      zipKey: zipKey
    });

  } catch (error) {
    logger.error(`Erro ao processar vídeo ${videoId}: ${error}`);

    // 6. Atualizar status para FAILED e notificar
    await videoRepo.update(videoId, { status: "FAILED" });
    await notificationService.notifyUser(
      userId,
      `Falha no processamento do vídeo ${videoId}. Detalhes: ${error}`
    );

    throw error; // Re-lança o erro para tratamento no consumer
  }
}

// Função auxiliar para criar ZIP
async function createZip(sourceDir: string, zipPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip");

    output.on("close", resolve);
    archive.on("error", reject);

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}