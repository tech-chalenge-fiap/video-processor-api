import { IController, IHttpRequest, IHttpResponse, InputValidationInterface } from '@/domain/protocols'
import { IUpsertVideoUseCase } from '@/domain/usecases'
import { NotFoundError } from '@/presentation/errors'
import { notFound, serverError, success } from '@/presentation/helpers'

export class UpsertVideoController implements IController {
  constructor(
    private readonly validator: InputValidationInterface,
    private readonly uploadVideUseCase: IUpsertVideoUseCase
  ) { }

  async handle(request: UpsertVideoController.Request): Promise<IHttpResponse> {
    try {
      const { body, files } = request

      const dataParams = { ...body, files }

      this.validator.validate(dataParams)

      const payment = await this.uploadVideUseCase.execute(dataParams)

      if (!payment) return notFound(new NotFoundError('Video'))

      return success(payment)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace UpsertVideoController {
  export interface Request extends IHttpRequest {
    body: IUpsertVideoUseCase.Params,
    files: IUpsertVideoUseCase.Files
  }

  export type Response = IUpsertVideoUseCase.Result
}

