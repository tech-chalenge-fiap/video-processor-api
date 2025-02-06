import { IListVideoParams } from "@/domain/usecases"

export namespace IListVideoRepository{
  export type Params = IListVideoParams

  export type Result = IListVideoResult[]
}

export interface IListVideoRepository {
  list(params: IListVideoRepository.Params): Promise<IListVideoRepository.Result>
}

interface IListVideoResult {
  id: number
  status: string
  fileKey ?: string | null
  zipKey ?: string | null
  createdAt: Date | null
  updatedAt: Date | null
}