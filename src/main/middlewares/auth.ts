import type express from 'express'

export async function expressAuthentication(
  _request: express.Request,
  _securityName: string,
  _scopes?: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  return null
}
