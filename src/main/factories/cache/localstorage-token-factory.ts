type TokenFormatted = string

export const localstorageTokenFactory = (currentSessionId: string, userId: string): TokenFormatted => {
  return `${currentSessionId}:${userId}`
}
