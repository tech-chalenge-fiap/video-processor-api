import { UpsertVideoRepository } from '@/infra/database'
import { IUpsertVideoRepository } from '@/domain/repositories'

export const makeUpsertVideoRepository = (): IUpsertVideoRepository => {
  return new UpsertVideoRepository()
}
