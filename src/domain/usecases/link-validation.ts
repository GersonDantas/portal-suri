import { LinkValidationResponse } from 'src/data/models/link-validation-response'

export interface LinkValidation {
  validate: (params: LinkValidation.Params) => Promise<LinkValidation.Response>
}

export namespace LinkValidation {
  export type Response = LinkValidationResponse

  export type Params = {
    email: string
    exp: Date
    hash: string
  }
}
