import { PrismaHelper } from '../helpers'
import type { IUpsertVideoRepository } from '@/domain/repositories'

export class UpsertVideoRepository implements IUpsertVideoRepository {
  async upsert(params: IUpsertVideoRepository.Params): Promise<IUpsertVideoRepository.Result> {
    const { prisma } = PrismaHelper

    const upsertData = {
      userId: +params.userId,
      status: params.status,
      originalName: params.originalname,
      fileKey: params.fileKey ?? undefined,
      zipKey: params.zipKey ?? undefined
    }

    const result = await prisma.video.upsert({
      where: {
        id: params.videoId ?? 0
      },
      update: upsertData,
      create: upsertData,
      select: {
        id: true,
        status: true,
        fileKey: true,
      }
    })

    return result
  }
}
