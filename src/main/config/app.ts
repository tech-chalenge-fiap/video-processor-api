/* eslint-disable no-console */
import type { Server } from 'http'
import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import { envConfig } from './env'
import { PrismaHelper } from '@/infra/database'

export class VideoProcessorApi {
  protected readonly app!: express.Express
  protected server!: Server

  constructor() {
    this.app = express()
    setupMiddlewares(this.app)
    setupRoutes(this.app)
    this.unmountApp()
  }

  async listen(callback: () => void = () => null): Promise<void> {
    this.server = this.app.listen(envConfig.PORT, callback)
  }

  private unmountApp(): void {
    const shutdown = async (): Promise<void> => {
      console.log('Shutting application down...')

      this.server.close(async (err) => {
        if (err) {
          console.log('Error on shutdown!')
          console.log(err)

          return process.exit(1)
        }

        await this.disconnectPrisma()

        console.log('Application shut down!')

        process.exit(0)
      })
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
  }

  private async disconnectPrisma(): Promise<void> {
    try {
      await PrismaHelper.disconnect()

      console.log('Disconnected from database')
    } catch (e) {
      console.log('Error disconnecting from database')
      console.log(e)

      return process.exit(1)
    }
  }
}
