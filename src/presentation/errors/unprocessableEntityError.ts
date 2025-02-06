export class UnprocessableEntityError extends Error {
  constructor(error?: any) {
    const messageError = 'Unprocessable Entity'
    super(messageError)
    this.message = messageError
    this.statusCode = 422
    if (typeof error === 'string') this.body = error
  }

  statusCode: number
  body: any
}
