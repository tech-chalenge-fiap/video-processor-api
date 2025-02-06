import { IUpsertVideoRepository } from '@/domain/repositories'

export namespace IUpsertVideoUseCase {
  export type Params = IUpsertVideoParams

  export type Result = IUpsertVideoRepository.Result

  export type Files = IFileUploadParams[]
}

export interface IUpsertVideoParams {
  userId: number
  files?: IFileUploadParams[]
}

export interface IFileUploadParams {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
}

export interface IUpsertVideoUseCase {
  execute(params: IUpsertVideoUseCase.Params): Promise<IUpsertVideoUseCase.Result>
}
