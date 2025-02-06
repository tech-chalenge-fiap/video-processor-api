import { makeListVideoValidator, makeListVideoUseCase } from '../..'
import { IController } from '@/domain/protocols'
import { ListVideoController } from '@/presentation/controllers/video/listVideoController'

export const makeListVideoController = (): IController<ListVideoController.Request> => {
  return new ListVideoController(
    makeListVideoValidator(),
    makeListVideoUseCase()
  )
}
