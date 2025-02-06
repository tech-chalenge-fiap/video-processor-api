import { IHttpResponse } from '.'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IMiddleware<T = any> {
  handle: (httpRequest: T) => Promise<IHttpResponse>
}
