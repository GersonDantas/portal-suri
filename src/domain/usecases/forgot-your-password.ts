import { ForgotPasswordResponse } from 'src/domain/models'

export interface ForgotYourPassword {
  sendEmail: (email: string) => Promise<ForgotYourPassword.Response>
}

export namespace ForgotYourPassword {
  export type Response = ForgotPasswordResponse
}
