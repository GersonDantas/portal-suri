import { HttpPostClient } from '@/data/protocols/http'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient {
  async post (params: HttpPostClient.Request): Promise<HttpPostClient.Response<any>> {
    const axiosResponse: AxiosResponse = await axios.post(params.url, params.body)
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
