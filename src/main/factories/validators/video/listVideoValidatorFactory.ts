import { ListVideoValidation } from '@/presentation/validators'

export const makeListVideoValidator = (): ListVideoValidation => {
  return new ListVideoValidation()
}
