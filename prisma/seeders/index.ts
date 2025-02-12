/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type PrismaClient } from '@prisma/client'

import { usersList } from './usersList'

export const getSeeders = (
  prisma: PrismaClient
): Array<{ prismaFn: any; data: any[]; onFinish?: () => void }> => {

  return [
    {
      prismaFn: prisma.user.createMany,
      data: usersList,
      onFinish: () => console.log('Finished seeding `users` table.')
    }
  ]
}

