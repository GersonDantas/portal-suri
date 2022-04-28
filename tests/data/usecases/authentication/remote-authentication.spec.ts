import { HttpPostClientSpy } from '@/tests/data/test'
import { RemoteAuthentication } from '@/data/usecases'

import faker from '@faker-js/faker'
import { mockAuthenticationParams } from '@/../tests/domain/mocks'

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
})
