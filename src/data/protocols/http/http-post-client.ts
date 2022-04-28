export interface HttpPostClient {
  post: (req: HttpPostClient.Request) => Promise<HttpPostClient.Response>
}

export namespace HttpPostClient {
  export type Request = {
    url: string
    body?: any
  }

  export type Response = {
    statusCode: HttpStatusCode
    body?: any
  }
}

export enum HttpStatusCode {
  unauthorized = 401,
  badRequest = 400,
  notFound = 404,
  serverError = 500,
  ok = 200
}
