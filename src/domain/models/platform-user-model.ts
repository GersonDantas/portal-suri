export type PlatformUserModel = {
  id: string
  name: string
  email: string
  whatsapp: string
  cbmTeam: PlatformUserModel.CbmTeam
  imageUrl: string
  chatBots: PlatformUserModel.chatbotItem[]
  lastPing: Date
  notification: boolean
}

namespace PlatformUserModel {
  export type chatbotItem = {
    id: string
    name: string
    imageUrl: string
  }

  export enum CbmTeam {
    Administrative = 0,
    CustomerSuccess = 1,
    Technology = 2,
    Marketing = 3,
    Sales = 4,
    Management = 5
  }
}
