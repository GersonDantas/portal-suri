import { ForgotPasswordResponse, ForgotPasswordResponseType } from 'src/data/models'

import faker from '@faker-js/faker'

type Params = {
  success?: boolean
}

export const mockForgotPasswordResponse = (params?: Params): ForgotPasswordResponse => ({
  success: params?.success || false,
  type: params?.success
    ? ForgotPasswordResponseType.ResetLinkSent
    : faker.random.arrayElement([
      ForgotPasswordResponseType.IsFacebookUser,
      ForgotPasswordResponseType.UserNotFound
    ])
})
