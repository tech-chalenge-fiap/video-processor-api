import { ListVideoRepository } from '@/infra/database'
import { IListVideoRepository } from '@/domain/repositories'

export const makeListVideoRepository = (): IListVideoRepository => {
  return new ListVideoRepository()
}
