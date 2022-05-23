type ApiUrl = string

export const makeApiUrl = (path: string): ApiUrl => {
  return `${process.env.REACT_APP_API_URL}${path}`
}
