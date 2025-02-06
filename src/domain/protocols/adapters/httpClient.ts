/* eslint-disable @typescript-eslint/no-explicit-any */
export type IHttpRequest = {
  url?: string
  method?: HttpMethod
  body?: any
  headers?: any
  responseType?: any
  timeout?: number
  query?: any
}

export interface HttpClient<R = any> {
  request: (data: IHttpRequest) => Promise<IHttpResponse<R>>
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch'

export enum HttpMethodEnum {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch'
}

export enum HttpStatusCode {
  success = 200,
  successfullyCreated = 201,
  noContent = 204,
  partialContent = 206,
  multiStatus = 207,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  unprocessableEntity = 422,
  failedDependency = 424,
  serverError = 500,
  gatewayTimeout = 504
}

export type IHttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
  headers?: any
}
