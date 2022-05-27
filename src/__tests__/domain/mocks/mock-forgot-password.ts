import { ForgotPasswordResponse, ForgotPasswordResponseType } from 'src/data/models'

import faker from '@faker-js/faker'

export const mockForgotPasswordResponse = (): ForgotPasswordResponse => ({
  success: faker.datatype.boolean(),
  type: faker.random.arrayElement([
    ForgotPasswordResponseType.IsFacebookUser,
    ForgotPasswordResponseType.UserNotFound,
    ForgotPasswordResponseType.ResetLinkSent
  ])
})
