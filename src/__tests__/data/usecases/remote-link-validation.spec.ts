import { mockLinkValidationResponse } from '../mock/mock-link-validation-response'
import { HttpClientSpy } from '../test'
import { mockLinValidationParams } from 'src/__tests__/domain/mocks'
import { HttpStatusCode } from 'src/data/protocols/http'
import { RemoteLinkValidation } from 'src/data/usecases'

import faker from '@faker-js/faker'

type SutTypes = {
  sut: RemoteLinkValidation
  httpClientSpy: HttpClientSpy
}

type SutParams = {
  url?: string
  body?: any
  statusCode?: HttpStatusCode
}

const makeSut = ({ url, body, statusCode }: SutParams = {
  url: faker.internet.url(),
  body: faker.random.arrayElement([undefined, null, {}])
}): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLinkValidation.Model>({ statusCode: statusCode ?? 200, body })
  const sut = new RemoteLinkValidation(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLinkValidation', () => {
  test('Should call RemoteLinkValidation with correct values', () => {
    const body = mockLinkValidationResponse({ success: true })
    const params = mockLinValidationParams()
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut({ url, body })

    sut.validate(params)

    expect(httpClientSpy.body).toBe(JSON.stringify(params.hash))
    expect(httpClientSpy.url).toBe(`${url}/${params.email}:${params.exp}`)
    expect(httpClientSpy.method).toBe('post')
  })
})
