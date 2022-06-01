import { LinkValidationResponse, LinkValidationResponseType } from 'src/data/models'

import faker from '@faker-js/faker'

type params = {
  success?: boolean
}

export const mockLinkValidationResponse = ({ success }: params): LinkValidationResponse => ({
  success: success || false,
  type: success
    ? LinkValidationResponseType.ValidResetLink
    : faker.random.arrayElement([
      LinkValidationResponseType.InvalidResetLink,
      LinkValidationResponseType.LinkAlreadyUsed
    ])
})
