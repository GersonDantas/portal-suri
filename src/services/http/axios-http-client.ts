import { HttpClient } from 'src/data/protocols/http'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request (data: HttpClient.Request): Promise<HttpClient.Response> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body
      })
    } catch (error: any) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
