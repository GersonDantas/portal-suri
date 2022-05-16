
import { mockPostRequest } from 'src/__tests__/data/test'
import { mockAxios, mockedHttpResponse } from 'src/__tests__/infra/http/mocks'
import { AxiosHttpClient } from 'src/infra/http'

import axios from 'axios'


type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

jest.mock('axios')

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const request = mockPostRequest()

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut()

    const httpResponse = await sut.post(mockPostRequest())
    const mockedAxiosResponse = await mockedAxios.post.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResponse.status,
      body: mockedAxiosResponse.data
    })
  })

  test('Should return the correct error', () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValueOnce({
      response: mockedHttpResponse
    })

    const promise = sut.post(mockPostRequest())

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
