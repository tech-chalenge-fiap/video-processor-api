import { UpsertVideoValidation } from '@/presentation/validators'

export const makeUpsertVideoValidator = (): UpsertVideoValidation => {
  return new UpsertVideoValidation()
}
