/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHttpResponse } from '@/domain/protocols'

export const success = (data: any, headers?: any): IHttpResponse => ({
  statusCode: 200,
  body: data,
  headers
})

export const successfullyCreated = (data: Record<string, unknown>): IHttpResponse => ({
  statusCode: 201,
  body: data
})

export const partialContent = (data: any): IHttpResponse => ({
  statusCode: 206,
  body: data
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const multiStatus = (data: any): IHttpResponse => ({
  statusCode: 207,
  body: data
})

export const badRequest = (error: Error | string[] | null): IHttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (error: Error | string[] | null): IHttpResponse => ({
  statusCode: 401,
  body: error
})

export const forbidden = (error: Error): IHttpResponse => ({
  statusCode: 403,
  body: error
})

export const notFound = (error: Error): IHttpResponse => ({
  statusCode: 404,
  body: error
})

export const unprocessableEntity = (
  error: Error | string[] | null
): IHttpResponse => ({
  statusCode: 422,
  body: error
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serverError = (error: any): IHttpResponse => {
  let errorDetails = error?.body?.error ||
    error?.body ||
    error?.meta
  if (!errorDetails) errorDetails = error

  return {
    statusCode: error?.statusCode || 500,
    body:
      errorDetails
  }
}
