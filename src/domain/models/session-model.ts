import { PlatformUserModel } from 'src/domain/models'

export type SessionModel = {
  platformUser: PlatformUserModel
  name: string
  authenticationType: string
  isAuthenticated: boolean
  settings: SessionModel.Settings
  tokenSession: string
}

export namespace SessionModel {
  export type Settings = {
    environment: 'PROD' | 'STG' | 'DEV'
    chatAppId: string
    webChatUrl: string
    version: string
    pliqSurveyUrl: string
  }
}
