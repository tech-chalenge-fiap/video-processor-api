import { IController, IHttpRequest, IHttpResponse, InputValidationInterface } from '@/domain/protocols'
import { IListVideoUseCase } from '@/domain/usecases'
import { NotFoundError } from '@/presentation/errors'
import { notFound, serverError, success } from '@/presentation/helpers'

export class ListVideoController implements IController {
  constructor(
    private readonly validator: InputValidationInterface,
    private readonly listVideUseCase: IListVideoUseCase
  ) { }

  async handle(request: ListVideoController.Request): Promise<IHttpResponse> {
    try {
      const { query } = request

      this.validator.validate({ ...query })

      const result = await this.listVideUseCase.execute(query)

      if (!result.length) return notFound(new NotFoundError('Video'))

      return success(result)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace ListVideoController {
  export interface Request extends IHttpRequest {
    query: IListVideoUseCase.Params
  }

  export type Response = IListVideoUseCase.Result
}

