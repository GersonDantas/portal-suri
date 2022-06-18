import { HttpClientSpy } from '../test'
import { mockResetPasswordParams } from 'src/__tests__/domain/mocks'
import { HttpStatusCode } from 'src/data/protocols/http'
import { RemoteResetPassword } from 'src/data/usecases'
import { InvalidCredentialsError } from 'src/domain/errors'

import faker from '@faker-js/faker'

type SutType = {
  httpClientSpy: HttpClientSpy
  sut: RemoteResetPassword
}

const makeSut = (url = faker.internet.url()): SutType => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteResetPassword(url, httpClientSpy)

  return {
    httpClientSpy,
    sut
  }
}

describe('RemoteResetPassword', () => {
  test('Should call RemoteResetPassword with correct values', () => {
    const url = faker.internet.url()
    const { httpClientSpy, sut } = makeSut(url)
    const params = mockResetPasswordParams()

    sut.reset(params)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.body).toEqual(params)
    expect(httpClientSpy.method).toEqual('put')
  })

  it('Should throw InvalidCredentialsError if HttpClient return 400', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.reset(mockResetPasswordParams())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
