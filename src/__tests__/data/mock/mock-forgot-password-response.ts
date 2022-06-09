import { ForgotPasswordResponseModel, ForgotPasswordResponseType } from 'src/domain/models'

type Params = {
  success?: boolean
  type?: ForgotPasswordResponseType
}

export const mockForgotPasswordResponseModel = (params?: Params): ForgotPasswordResponseModel => ({
  success: params?.success || false,
  type: params?.success
    ? ForgotPasswordResponseType.ResetLinkSent
    : params?.type === ForgotPasswordResponseType.IsFacebookUser
      ? ForgotPasswordResponseType.IsFacebookUser
      : ForgotPasswordResponseType.UserNotFound
})
