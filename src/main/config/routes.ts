import { type Express, Router } from 'express'
import {
  healthCheckRoutes,
  videoRoutes
} from '../routes'

export default (app: Express): void => {
  const router = Router()

  healthCheckRoutes(router)
  videoRoutes(router)

  app.use('/', router)
}
