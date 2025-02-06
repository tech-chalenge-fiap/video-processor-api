/* eslint-disable @typescript-eslint/no-explicit-any */
export class ServerError extends Error {
  constructor(error?: any) {
    super('Internal Server Error')
    this.message = 'Internal Server Error'
    this.statusCode = 500
    this.processError(error)
  }

  private processError(error?: any) {
    if (typeof error === 'string') {
      this.body = error
    } else if (typeof error === 'object') {
      this.processErrorObject(error)
    }
    if (error?.code) this.code = error?.code
    if (error?.meta) this.meta = error.meta
  }

  private processErrorObject(error: any) {
    this.statusCode = error.statusCode
    if (typeof error.body === 'string') {
      this.body = error.body
    } else if (typeof error.body === 'object') {
      this.processErrorBodyObject(error.body)
    }
    if (error instanceof Error) {
      this.errorInfo = JSON.stringify({
        message: error?.message,
        stack: error?.stack
      })
    }
  }

  private processErrorBodyObject(body: any) {
    if (body.errors) {
      if (typeof body.errors === 'object') {
        this.body = JSON.stringify(body.errors)
      }
    } else {
      this.body = JSON.stringify(body)
    }
  }

  override name!: string
  override message!: string
  override stack?: string
  errorInfo?: any
  statusCode: number
  body: any
  code?: any
  meta?: any
}
