import { IListVideoUseCase, IListVideoRepository } from '@/domain'

export class ListVideoUseCase implements IListVideoUseCase {
  constructor(
    private readonly videoRepo: IListVideoRepository
  ) { }

  async execute(params: IListVideoUseCase.Params): Promise<IListVideoUseCase.Result> {
    const { userId } = params
    

    const result = await this.videoRepo.list({
      userId
    })

    return result
  }
}