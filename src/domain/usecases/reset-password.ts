export interface ResetPassword {
  reset: (params: ResetPassword.Params) => Promise<ResetPassword.Response>
}

export namespace ResetPassword {
  export interface Params {
    email: string
    hash: string
    password: string
  }

  export type Response = boolean
}
