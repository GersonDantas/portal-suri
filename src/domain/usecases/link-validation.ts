import { LinkValidationParams, LinkValidationResponse } from 'src/domain/models'

export interface LinkValidation {
  validate: (params: LinkValidation.Params) => Promise<LinkValidation.Response>
}

export namespace LinkValidation {
  export type Response = LinkValidationResponse

  export type Params = LinkValidationParams
}
