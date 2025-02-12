import { adaptRoute } from '@/infra/adapters'
import { type Router } from 'express'
import {
  makeUpsertVideoController,
  makeListVideoController
} from '../factories'

import { requestFile, authMiddleware } from '../middlewares'

export const videoRoutes = (router: Router): void => {
  router.post(
    '/video/upload',
    requestFile as never,
    authMiddleware(),
    adaptRoute(makeUpsertVideoController())
  )

  router.get(
    '/video/list',
    authMiddleware(),
    adaptRoute(makeListVideoController())
  )
}
