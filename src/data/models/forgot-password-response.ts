export enum ForgotPasswordResponseType {
  UserNotFound,
  IsFacebookUser,
  ResetLinkSent
}

export class ForgotPasswordResponse {
  success: boolean
  type: ForgotPasswordResponseType
}
