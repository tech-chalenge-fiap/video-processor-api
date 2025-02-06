import Joi from 'joi'
import type { ObjectValidator } from '@/domain/protocols'
import type { AnySchema } from 'joi'
import { UnprocessableEntityError } from '@/presentation/errors'

export class ObjectValidatorAdapter implements ObjectValidator<typeof Joi, AnySchema> {
  validate(schema: AnySchema, objectToValidate: object): UnprocessableEntityError | null {
    const { error } = schema.validate(objectToValidate, { abortEarly: false })
    if (error) {
      throw new UnprocessableEntityError(error.details.map((d) => d.message).join())
    }
    return null
  }

  validator = Joi
}
