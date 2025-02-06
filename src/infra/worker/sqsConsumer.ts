import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";
import { VideoProcessor } from "../services/videoProcessor";
import { S3Service } from "../services/S3Service";
import { PrismaClient } from "@prisma/client"; // Prisma da raiz

const prisma = new PrismaClient();
const sqs = new SQSClient({ region: process.env.AWS_REGION });

export class SQSConsumer {
  private processor: VideoProcessor;

  constructor() {
    this.processor = new VideoProcessor(new S3Service());
  }

  async start() {
    while (true) {
      try {
        const response = await sqs.send(
          new ReceiveMessageCommand({
            QueueUrl: process.env.AWS_SQS_QUEUE_URL!,
            MaxNumberOfMessages: 10,
            WaitTimeSeconds: 20,
          })
        );

        if (response.Messages) {
          for (const msg of response.Messages) {
            await this.processMessage(msg);
          }
        }
      } catch (error) {
        logger.error(`Erro no consumer SQS: ${error}`);
      }
    }
  }

  private async processMessage(msg: any) {
    const { videoId, s3Key, userId } = JSON.parse(msg.Body!);

    try {
      // Atualiza status para PROCESSING
      await prisma.video.update({
        where: { id: videoId },
        data: { status: "PROCESSING" }
      });

      // Processa o vídeo
      const zipKey = await this.processor.processVideo(s3Key);

      // Atualiza status para COMPLETED
      await prisma.video.update({
        where: { id: videoId },
        data: { status: "COMPLETED", zipKey }
      });

      // Confirma mensagem
      await sqs.send(
        new DeleteMessageCommand({
          QueueUrl: process.env.AWS_SQS_QUEUE_URL!,
          ReceiptHandle: msg.ReceiptHandle!,
        })
      );
    } catch (error) {
      logger.error(`Erro ao processar vídeo ${videoId}: ${error}`);
      await prisma.video.update({
        where: { id: videoId },
        data: { status: "FAILED" }
      });
    }
  }
}