export interface HttpPostClient<Resp = any, req = any> {
  post: (req: HttpPostClient.Request<req>) => Promise<HttpPostClient.Response<Resp>>
}

export namespace HttpPostClient {
  export type Request<req = any> = {
    url: string
    body?: req
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
