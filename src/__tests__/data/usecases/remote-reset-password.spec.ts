import { HttpClientSpy } from '../test'
import { mockResetPasswordParams, mockResetPasswordResponse } from 'src/__tests__/domain/mocks'
import { HttpStatusCode } from 'src/data/protocols/http'
import { RemoteResetPassword } from 'src/data/usecases'
import { InvalidCredentialsError, UnexpectedError } from 'src/domain/errors'

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

  it('Should throw UnexpectedError if HttpClient return 500', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.reset(mockResetPasswordParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpClient return 404', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.reset(mockResetPasswordParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should RemoteResetPassword reutrn ok if HttpClient return 200', async () => {
    const { httpClientSpy, sut } = makeSut()
    const httpResult = mockResetPasswordResponse()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const response = await sut.reset(mockResetPasswordParams())

    expect(response).toEqual(httpResult)
  })
})
