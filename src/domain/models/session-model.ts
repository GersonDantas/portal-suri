import { PlatformUserModel } from '@/domain/models'

export type SessionModel = {
  platformUser: SessionModel.PlatformUser
  name: string
  authenticationType: string
  isAuthenticated: boolean
  settings: SessionModel.Settings
  tokenSession: string
}

namespace SessionModel {
  export type PlatformUser = PlatformUserModel

  export type Settings = {
    environment: 'PROD' | 'STG' | 'DEV'
    chatAppId: string
    webChatUrl: string
    version: string
    pliqSurveyUrl: string
  }
}
