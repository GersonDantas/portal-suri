export enum LinkValidationResponseType {
  InvalidResetLink = 3,
  LinkAlreadyUsed = 4,
  ValidResetLink = 5
}

export interface LinkValidationResponseModel {
  success: boolean
  type: LinkValidationResponseType
}

export type LinkValidationParams = {
  email: string
  exp: string
  hash: string
}
