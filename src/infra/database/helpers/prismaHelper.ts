import { envConfig } from '@/main/config'
import prisma from './client'

/* istanbul ignore next */
if (envConfig.IS_ACTIVE_DB_DEBUG) {
  prisma.$on('query', (log) => {
    // eslint-disable-next-line no-console
    console.log(log)
  })
  prisma.$use(async (params, next) => {
    const before = Date.now()
    const result = await next(params)
    const after = Date.now()

    // eslint-disable-next-line no-console
    console.log(`Query ${params.model!}.${params.action} took ${after - before}ms`)

    return result
  })
}

export const PrismaHelper = {
  logger: console,
  prisma,
  async connect(): Promise<void> {
    await this.prisma.$connect()
  },
  async disconnect(): Promise<void> {
    await this.prisma.$disconnect()
  }
}
