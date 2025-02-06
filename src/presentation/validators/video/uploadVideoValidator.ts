import { GenericValidator } from '@/infra/adapters'

export class UpsertVideoValidation extends GenericValidator {
  protected getSchema(): GenericValidator.Schema {
    return this.validator.object({
      userId: this.validator.number().required(),
      files: this.validator.array().max(1).items(
        this.validator.object({
          mimetype: this.validator.string().required().regex(/^video\/(mp4|avi|mov|wmv|flv|mkv|webm)$/)
        }).unknown()
      )
    })
  }
}
