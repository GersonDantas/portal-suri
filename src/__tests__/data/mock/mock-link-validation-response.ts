import { UnexpectedError } from 'src/domain/errors'
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

export class RemoteLinkValidationSpy implements LinkValidation {
  response: LinkValidation.Response

  async validate (params: LinkValidation.Params): Promise<LinkValidation.Response> {
    if (this.response.success) {
      return this.response
    } else {
      throw new UnexpectedError()
    }
  }
}
