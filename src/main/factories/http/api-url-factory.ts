type ApiUrl = string

export const makeApiUrl = (path: string): ApiUrl => {
  return `https://portal-staging.chatbotmaker.io${path}`
}
