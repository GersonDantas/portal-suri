import { PlatformUserModel } from 'src/domain/models'

export interface SessionModel {
  platformUser: PlatformUserModel
  name: string
  authenticationType: string
  isAuthenticated: boolean
  settings: SessionModel.Settings
  tokenSession: string
}

export type CbmAuth = `${SessionModel['tokenSession']}:${PlatformUserModel['id']}`

export namespace SessionModel {
  export interface Settings {
    environment: 'PROD' | 'STG' | 'DEV'
    chatAppId: string
    webChatUrl: string
    version: string
    pliqSurveyUrl: string
  }
}
