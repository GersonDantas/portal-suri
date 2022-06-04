import { LinkValidationResponseModel, LinkValidationResponseType } from 'src/domain/models'

import faker from '@faker-js/faker'

type Params = {
  success?: boolean
}

export const mockLinkValidationResponseModel = (params?: Params): LinkValidationResponseModel => ({
  success: params?.success || false,
  type: params?.success
    ? LinkValidationResponseType.ValidResetLink
    : faker.random.arrayElement([
      LinkValidationResponseType.InvalidResetLink,
      LinkValidationResponseType.LinkAlreadyUsed
    ])
})
