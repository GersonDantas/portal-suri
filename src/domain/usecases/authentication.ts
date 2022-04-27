import { SessionModel } from '../models/session-model'

export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Session>
}

namespace Authentication {
  export type Params = {
    email: string
    password: string
  }

  export type Session = SessionModel
}
