import { AxiosHttpClient } from '@/infra/http'
import { HttpPostClient } from '@/data/protocols/http'

import faker from '@faker-js/faker'
import axios from 'axios'

type SutTypes = {
  sut: AxiosHttpClient
}

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
  status: faker.datatype.number(),
  data: faker.random.objectElement({})
}
mockedAxios.post.mockClear().mockResolvedValue(mockedAxiosResult)

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()

  return {
    sut
  }
}

const mockPostRequest = (): HttpPostClient.Request => ({
  url: faker.internet.url(),
  body: faker.random.objectElement({})
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const { sut } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.post(mockPostRequest())
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
