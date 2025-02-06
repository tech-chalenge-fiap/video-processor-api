import { ListVideoUseCase } from '@/data/usecases'
import { IListVideoUseCase } from '@/domain/usecases'
import { makeListVideoRepository } from '../../repositories/video'

export const makeListVideoUseCase = (): IListVideoUseCase => {
  return new ListVideoUseCase(
    makeListVideoRepository()
  )
}
