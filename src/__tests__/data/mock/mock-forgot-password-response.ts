import { ForgotPasswordResponseModel, ForgotPasswordResponseType } from 'src/domain/models'

import faker from '@faker-js/faker'

type Params = {
  success?: boolean
}

export const mockForgotPasswordResponseModel = (params?: Params): ForgotPasswordResponseModel => ({
  success: params?.success || false,
  type: params?.success
    ? ForgotPasswordResponseType.ResetLinkSent
    : faker.random.arrayElement([
      ForgotPasswordResponseType.IsFacebookUser,
      ForgotPasswordResponseType.UserNotFound
    ])
})
