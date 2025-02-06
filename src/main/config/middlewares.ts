import { type Express } from 'express'
import { bodyParser, contentType, cors, helmet } from '../middlewares'
export default (app: Express): void => {
  app.use((_req, _res, next) => {
    next()
  })
  app.use(bodyParser)
  app.use(helmet)
  app.use(cors)
  app.use(contentType)
}
