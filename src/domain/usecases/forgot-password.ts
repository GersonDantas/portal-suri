export interface ForgotYourPassword {
  forgot: (email: string) => Promise<boolean>
}
