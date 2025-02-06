import type { ObjectSchema } from 'joi'

import type { InputValidationInterface } from '@/domain/protocols'
import { ObjectValidatorAdapter } from './objectValidatorAdapter'
import { UnprocessableEntityError } from '@/presentation/errors'

export abstract class GenericValidator implements InputValidationInterface {
  protected abstract getSchema(): GenericValidator.Schema

  constructor(
    protected readonly objectValidatorAdapter: ObjectValidatorAdapter = new ObjectValidatorAdapter(),
    protected readonly validator = new ObjectValidatorAdapter().validator
  ) { }

  public validate(input: Record<string, unknown> | unknown[]): GenericValidator.Result {
    return this.objectValidatorAdapter.validate(this.getSchema(), input)
  }
}

export namespace GenericValidator {
  export type Schema = ObjectSchema
  export type Result = string[] | UnprocessableEntityError | null
}
