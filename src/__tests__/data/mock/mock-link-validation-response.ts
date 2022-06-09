import { LinkValidationResponseModel, LinkValidationResponseType } from 'src/domain/models'
import { LinkValidation } from 'src/domain/usecases'

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

export class LinkValidationSpy implements LinkValidation {
  response: LinkValidation.Response

  async validate (params: LinkValidation.Params): Promise<LinkValidation.Response> {
    return Promise.resolve(this.response)
  }
}
