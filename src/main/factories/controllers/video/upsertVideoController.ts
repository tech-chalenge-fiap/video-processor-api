import { makeUpsertVideoValidator, makeUpsertVideoUseCase } from '../..'
import { IController } from '@/domain/protocols'
import { UpsertVideoController } from '@/presentation/controllers/video/uploadVideoController'

export const makeUpsertVideoController = (): IController<UpsertVideoController.Request> => {
  return new UpsertVideoController(
    makeUpsertVideoValidator(),
    makeUpsertVideoUseCase()
  )
}
