import { HttpPostClientSpy } from '@/tests/data/test'
import { RemoteAuthentication } from '@/data/usecases'
import { mockAuthenticationParams, mockPlatformUser, mockSettings } from '@/tests/domain/mocks'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialError, UnexpectedError } from '@/domain/errors/http'

import faker from '@faker-js/faker'

type SutTypes = {
  httpPostClientSpy: HttpPostClientSpy
  sut: RemoteAuthentication
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    httpPostClientSpy,
    sut
  }
}

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct values', async () => {
    const url = faker.internet.url()
    const { httpPostClientSpy, sut } = makeSut(url)
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.url).toBe(url)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  it('Should throw InvalidCredentialError if HttpPostClient return 401', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new InvalidCredentialError())
  })

  it('Should throw UnexpectedError if HttpPostClient return 400', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient return 500', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient return 404', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient return 404', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should RemoteAuthentication return ok if HttpPostClient return 200', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    const httpResult = {
      platformUser: mockPlatformUser(),
      name: faker.random.words(),
      authenticationType: faker.random.words(),
      isAuthenticated: faker.datatype.boolean(),
      settings: mockSettings(),
      tokenSession: faker.datatype.uuid()
    }
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const session = await sut.auth(mockAuthenticationParams())
    expect(session).toEqual(httpResult)
  })
})
