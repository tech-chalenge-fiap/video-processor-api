import { CognitoJwtVerifier } from 'aws-jwt-verify'
import type { Request, Response, NextFunction } from 'express'
import { envConfig } from '../config'


export function authMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization ?? ''
    if (!authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).send('Unauthorized')
    }

    const token = authorizationHeader.replace('Bearer ', '')

    const verifier = CognitoJwtVerifier.create({
      userPoolId: envConfig.AUTH_PROVIDER_USER_POOL_ID ?? '',
      tokenUse: 'access',
      clientId: envConfig.AUTH_PROVIDER_CLIENT_ID ?? ''
    })

    try {
      const payload = await verifier.verify(token)
      // @ts-expect-error
      req.user = payload
      next()
    } catch (error) {
      res.status(401).send('Unauthorized')

    }
  }
}
