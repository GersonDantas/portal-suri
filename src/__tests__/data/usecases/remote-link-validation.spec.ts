import { mockLinkValidationResponseModel } from 'src/__tests__/data/mock'
import { HttpClientSpy } from 'src/__tests__/data/test'
import { mockLinValidationParams } from 'src/__tests__/domain/mocks'
import { HttpStatusCode } from 'src/data/protocols/http'
import { RemoteLinkValidation } from 'src/data/usecases'
import { InvalidCredentialsError, InvalidResetLinkError, LinkAlreadyUsedError } from 'src/domain/errors'
import { LinkValidationResponseType } from 'src/domain/models'

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
  const httpClientSpy = new HttpClientSpy<RemoteLinkValidation.Model>({ statusCode: 200, body })
  const sut = new RemoteLinkValidation(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

const setError = async (type: 3 | 4): Promise<void> => {
  const body = mockLinkValidationResponseModel({ type })
  const { sut } = makeSut({ body })
  const promise = sut.validate(mockLinValidationParams())

  await expect(promise).rejects.toThrow(type === 3 ? new InvalidResetLinkError() : new LinkAlreadyUsedError())
}

describe('RemoteLinkValidation', () => {
  test('Should call RemoteLinkValidation with correct values', () => {
    const body = mockLinkValidationResponseModel({ success: true })
    const params = mockLinValidationParams()
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut({ url, body })

    sut.validate(params)

    expect(httpClientSpy.body).toBe(JSON.stringify(params.hash))
    expect(httpClientSpy.url).toBe(`${url}/${params.email}:${params.exp}`)
    expect(httpClientSpy.method).toBe('post')
  })

  test('Should ensure RemoteForgotPassword returns InvalidResetLinkError if link invalid',
    async () => await setError(3)
  )

  test('Should ensure RemoteForgotPassword returns LinkAlreadyUsedError if link already used',
    async () => await setError(4)
  )

  test('Should ensure RemoteLinkValidation returns success if reset link sent', async () => {
    const body = mockLinkValidationResponseModel({ success: true })
    const { sut } = makeSut({ body })

    const linkValidationResponse = await sut.validate(mockLinValidationParams())

    expect(linkValidationResponse.success).toBe(true)
    expect(linkValidationResponse.type).toBe(LinkValidationResponseType.ValidResetLink)
  })

  it('Should throw InvalidCredentialsError if HttpClient return 400', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.validate(mockLinValidationParams())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
