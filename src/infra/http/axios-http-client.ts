import { HttpPostClient } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient {
  async post (params: HttpPostClient.Request): Promise<void> {
    await axios.post(params.url, params.body)
  }
}
