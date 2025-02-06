import { adaptRoute } from '@/infra/adapters'
import { type Router } from 'express'
import {
  makeUpsertVideoController,
  makeListVideoController
} from '../factories'

import { requestFile } from '../middlewares'

export const videoRoutes = (router: Router): void => {
  router.post(
    '/video/upload',
    requestFile as never,
    adaptRoute(makeUpsertVideoController())
  )

  router.get(
    '/video/list',
    adaptRoute(makeListVideoController())
  )
}
