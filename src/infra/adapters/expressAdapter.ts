import { type Request, type Response, type NextFunction } from 'express'
import { type IMiddleware } from '@/domain/protocols'

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.authorization,
      ...(req.headers || {})
    }
    const httpResponse = await middleware.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      const error = httpResponse.body.message || httpResponse.body
      res.status(httpResponse.statusCode).json(error)
    }
  }
}
