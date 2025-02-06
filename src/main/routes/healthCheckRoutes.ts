import { type Router } from 'express'

export const healthCheckRoutes = (router: Router): void => {
  router.get('/healthCheck', (_, res) => {
    return res.status(200).send({
      uptime: process.uptime(),
      message: "OK"
    })
  })
}
