export interface HttpPostClient<Resp = any> {
  post: (req: HttpPostClient.Request) => Promise<HttpPostClient.Response<Resp>>
}

export namespace HttpPostClient {
  export type Request = {
    url: string
    body?: any
  }

  export type Response<Resp = any> = {
    statusCode: HttpStatusCode
    body?: Resp
  }
}

export enum HttpStatusCode {
  unauthorized = 401,
  badRequest = 400,
  notFound = 404,
  serverError = 500,
  ok = 200
}
