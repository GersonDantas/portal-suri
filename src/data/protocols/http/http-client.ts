export interface HttpClient<Resp = any, req = any> {
  request: (data: HttpClient.Request<req>) => Promise<HttpClient.Response<Resp>>
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export namespace HttpClient {
  export interface Request<req = any> {
    url: string
    body?: req
    method: HttpMethod
    headers?: any
  }

  export interface Response<Resp = any> {
    statusCode: HttpStatusCode
    body?: Resp
  }
}

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
  UnsupportedMediaType = 415
}
