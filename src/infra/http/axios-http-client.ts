import { HttpPostClient } from 'src/data/protocols/http'

import axios, { AxiosResponse } from 'axios'



export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostClient.Request): Promise<HttpPostClient.Response<any>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error: any) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
