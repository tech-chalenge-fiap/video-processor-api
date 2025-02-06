import { type Request, type Response } from 'express'
import { type IController } from '@/domain/protocols'

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle({
      body: req.body || {},
      params: req.params || {},
      query: req.query || {},
      headers: req.headers || {},
      path: req.path,
      method: req.method,
      files: req.files ?? {}
    })

    if (httpResponse?.headers) res.set(httpResponse.headers)

    return res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
