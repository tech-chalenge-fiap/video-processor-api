import { PrismaHelper } from '../helpers'
import type { IListVideoRepository } from '@/domain/repositories'

export class ListVideoRepository implements IListVideoRepository {
  async list(params: IListVideoRepository.Params): Promise<IListVideoRepository.Result> {
    const { prisma } = PrismaHelper

    const result = await prisma.video.findMany({
      where: {
        user: {
          id: +params.userId
        }
      },
      select: {
        id: true,
        status: true,
        fileKey: true,
        zipKey: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return result
  }
}
