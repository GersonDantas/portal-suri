import { mockLinkValidationResponse } from '../mock/mock-link-validation-response'
import { HttpClientSpy } from '../test'
import { mockLinValidationParams } from 'src/__tests__/domain/mocks'
import { LinkValidationResponseType } from 'src/data/models'
import { HttpStatusCode } from 'src/data/protocols/http'
import { RemoteLinkValidation } from 'src/data/usecases'
import { InvalidResetLinkError, LinkAlreadyUsedError } from 'src/domain/errors'

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

  test('Should ensure RemoteLinkValidation returns InvalidResetLinkError or LinkAlreadyUsedError if user error', async () => {
    const body = mockLinkValidationResponse()
    const { sut } = makeSut({ body })
    const promise = sut.validate(mockLinValidationParams())

    await expect(promise).rejects.toThrow(
      body.type === LinkValidationResponseType.InvalidResetLink
        ? new InvalidResetLinkError()
        : new LinkAlreadyUsedError()
    )
  })

  test('Should ensure RemoteLinkValidation returns success if reset link sent', async () => {
    const body = mockLinkValidationResponse({ success: true })
    const { sut } = makeSut({ body })

    const linkValidationResponse = await sut.validate(mockLinValidationParams())

    expect(linkValidationResponse.success).toBe(true)
    expect(linkValidationResponse.type).toBe(LinkValidationResponseType.ValidResetLink)
  })
})
