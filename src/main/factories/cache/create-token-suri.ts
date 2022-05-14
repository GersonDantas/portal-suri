type TokenFormatted = string

export const createTokenSuri = (currentSessionId: string, userId: string): TokenFormatted => {
  return `${currentSessionId}:${userId}`
}
