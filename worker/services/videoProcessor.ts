// import { exec } from "child_process";
// import { promisify } from "util";
// import * as fs from "fs-extra";
// import * as path from "path";
// import tempy from "tempy";
// import archiver from "archiver";
// import { S3Service } from "./S3Service";

// const execAsync = promisify(exec);

// export class VideoProcessor {
//   constructor(private s3Service: S3Service) { }

//   async processVideo(s3Key: string): Promise<string> {
//     const tempDir = tempy.directory();
//     const videoPath = path.join(tempDir, "input.mp4");
//     const framesDir = path.join(tempDir, "frames");
//     const zipPath = path.join(tempDir, "output.zip");

//     try {
//       // 1. Download do vídeo do S3
//       const videoBuffer = await this.s3Service.download(s3Key);
//       await fs.writeFile(videoPath, videoBuffer);

//       // 2. Processar com FFmpeg (1 frame por segundo)
//       await fs.mkdir(framesDir);
//       await execAsync(
//         `ffmpeg -i "${videoPath}" -vf "fps=1" "${path.join(framesDir, "frame-%03d.jpg")}"`
//       );

//       // 3. Criar ZIP dos frames
//       await this.createZip(framesDir, zipPath);

//       // 4. Upload do ZIP para S3
//       const zipKey = `${s3Key}-frames.zip`;
//       const zipBuffer = await fs.readFile(zipPath);
//       await this.s3Service.upload(zipBuffer, zipKey);

//       return zipKey;
//     } finally {
//       await fs.remove(tempDir); // Limpeza
//     }
//   }

//   private async createZip(sourceDir: string, zipPath: string): Promise<void> {
//     return new Promise((resolve, reject) => {
//       const output = fs.createWriteStream(zipPath);
//       const archive = archiver("zip");

//       output.on("close", resolve);
//       archive.on("error", reject);

//       archive.pipe(output);
//       archive.directory(sourceDir, false);
//       archive.finalize();
//     });
//   }
// }