export interface HttpPostClient {
  post: (req: HttpPostClient.Request) => Promise<void>
}

export namespace HttpPostClient {
  export type Request = {
    url: string
    body?: any
  }
}
