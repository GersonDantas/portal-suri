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
  ok = 200
}
