import { IHttpResponse } from '.'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IController<T = any> {
  handle: (request: T) => Promise<IHttpResponse>
}
