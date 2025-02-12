import { PrismaClient } from '@prisma/client'
import { getSeeders } from './seeders'


const prisma = new PrismaClient()

async function main(): Promise<void> {

  for (const seed of getSeeders(prisma)) {
    const { data } = seed

    await seed.prismaFn({
      data,
      skipDuplicates: true
    })

    if (seed.onFinish) {
      seed.onFinish()
    }
  }
}


main()
  // eslint-disable-next-line no-console
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
