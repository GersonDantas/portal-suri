import { LinkValidationParams, LinkValidationResponseModel } from 'src/domain/models'

export interface LinkValidation {
  validate: (params: LinkValidation.Params) => Promise<LinkValidation.Response>
}

export namespace LinkValidation {
  export type Response = LinkValidationResponseModel

  export type Params = LinkValidationParams
}
