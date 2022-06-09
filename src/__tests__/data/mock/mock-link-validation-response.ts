import { LinkValidationResponseModel, LinkValidationResponseType } from 'src/domain/models'
import { LinkValidation } from 'src/domain/usecases'

type Params = {
  success?: boolean
  type?: LinkValidationResponseType
}

export const mockLinkValidationResponseModel = (params?: Params): LinkValidationResponseModel => ({
  success: params?.success || false,
  type: params?.success
    ? LinkValidationResponseType.ValidResetLink
    : params?.type === LinkValidationResponseType.InvalidResetLink
      ? LinkValidationResponseType.InvalidResetLink
      : LinkValidationResponseType.LinkAlreadyUsed
})

export class LinkValidationSpy implements LinkValidation {
  response: LinkValidation.Response

  async validate (params: LinkValidation.Params): Promise<LinkValidation.Response> {
    return this.response
  }
}
