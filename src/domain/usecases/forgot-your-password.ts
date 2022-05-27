import { ForgotPasswordResponse } from 'src/data/models'

export interface ForgotYourPassword {
  sendEmail: (email: string) => Promise<ForgotYourPassword.Response>
}

export namespace ForgotYourPassword {
  export type Response = ForgotPasswordResponse
}
