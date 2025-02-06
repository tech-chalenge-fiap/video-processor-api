import { UpsertVideoUseCase } from '@/data/usecases'
import { IUpsertVideoUseCase } from '@/domain/usecases'
import { makeUpsertVideoRepository } from '../../repositories/video'
import { makeCloudStorageClient, makeCloudMessagingClient } from '../../infra'

export const makeUpsertVideoUseCase = (): IUpsertVideoUseCase => {
  return new UpsertVideoUseCase(
    makeUpsertVideoRepository(),
    makeCloudStorageClient(),
    makeCloudMessagingClient()
  )
}
