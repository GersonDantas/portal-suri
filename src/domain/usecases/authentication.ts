import { SessionModel } from 'src/domain/models'

export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Session>
}

export namespace Authentication {
  export interface Params {
    email: string
    password: string
  }

  export type Session = SessionModel
}
