import { IListVideoRepository } from '@/domain/repositories'

export namespace IListVideoUseCase {
  export type Params = IListVideoParams

  export type Result = IListVideoRepository.Result
}

export interface IListVideoParams {
  userId: number
}

export interface IListVideoUseCase {
  execute(params: IListVideoUseCase.Params): Promise<IListVideoUseCase.Result>
}
