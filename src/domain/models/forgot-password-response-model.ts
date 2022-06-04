export enum ForgotPasswordResponseType {
  UserNotFound,
  IsFacebookUser,
  ResetLinkSent
}

export interface ForgotPasswordResponseModel {
  success: boolean
  type: ForgotPasswordResponseType
}
