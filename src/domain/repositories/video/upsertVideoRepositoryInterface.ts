import { type IUpsertVideoParams } from '@/domain/usecases'

export namespace IUpsertVideoRepository {
  export type Params = IUpsertVideoRepositoryParams

  export type Result = {
    id: number
    status: string | null
    fileKey: string | null
  } | null
}

interface IUpsertVideoRepositoryParams extends IUpsertVideoParams { 
  videoId?: number
  status?: string
  fileKey?: string
  zipKey?: string
  originalname?: string
}

export interface IUpsertVideoRepository {
  upsert(params: IUpsertVideoRepository.Params): Promise<IUpsertVideoRepository.Result>
}
