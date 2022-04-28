import { AxiosHttpClient } from '@/infra/http'

import axios from 'axios'
import faker from '@faker-js/faker'
import { HttpPostClient } from '@/data/protocols/http'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const mockPostRequest = (): HttpPostClient.Request => ({
  url: faker.internet.url(),
  body: faker.random.objectElement({})
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and verb', async () => {
    const request = mockPostRequest()
    const sut = new AxiosHttpClient()
    await sut.post({ url: request.url })
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url)
  })
})
