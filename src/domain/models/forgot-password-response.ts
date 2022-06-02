export enum ForgotPasswordResponseType {
  UserNotFound,
  IsFacebookUser,
  ResetLinkSent
}

export interface ForgotPasswordResponse {
  success: boolean
  type: ForgotPasswordResponseType
}
