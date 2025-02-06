import type { UnprocessableEntityError } from '@/presentation/errors'

export interface ObjectValidator<T, S> {
  validate: (schema: S, objectToValidate: object) => string[] | null | UnprocessableEntityError
  validator: T
}
