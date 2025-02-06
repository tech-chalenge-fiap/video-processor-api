import { GenericValidator } from '@/infra/adapters'

export class ListVideoValidation extends GenericValidator {
  protected getSchema(): GenericValidator.Schema {
    return this.validator.object({
      userId: this.validator.number().required()
    })
  }
}
