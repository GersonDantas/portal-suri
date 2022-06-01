export enum LinkValidationResponseType {
  InvalidResetLink = 3,
  LinkAlreadyUsed = 4,
  ValidResetLink = 5
}

export interface LinkValidationResponse {
  success: boolean
  type: LinkValidationResponseType
}
