import { CbmAuth, PlatformUserModel, SessionModel } from 'src/domain/models'

type Params = {
  tokenSession: SessionModel['tokenSession']
  userId: PlatformUserModel['id']
}

export const createTokenSuri = ({ tokenSession, userId }: Params): CbmAuth => {
  return `${tokenSession}:${userId}`
}
