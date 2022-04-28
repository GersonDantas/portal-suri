import { HttpPostClientSpy } from '@/tests/data/test'
import { RemoteAuthentication } from '@/data/usecases'
import { mockAuthenticationParams } from '@/tests/domain/mocks'

import faker from '@faker-js/faker'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialError } from '@/domain/errors/http'

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
})
