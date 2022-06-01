import { mockLinkValidationResponse } from '../mock/mock-link-validation-response'
import { HttpClientSpy } from '../test'
import { mockLinValidationParams } from 'src/__tests__/domain/mocks'
import { RemoteLinkValidation } from 'src/data/usecases'
import { LinkValidation } from 'src/domain/usecases'

import faker from '@faker-js/faker'

describe('RemoteLinkValidation', () => {
  test('Should call RemoteLinkValidation with correct values', () => {
    const body = mockLinkValidationResponse({ success: true })
    const params = mockLinValidationParams()
    const url = faker.internet.url()
    const httpClientSpy = new HttpClientSpy<LinkValidation.Response>({ statusCode: 200, body })
    const sut = new RemoteLinkValidation(url, httpClientSpy)

    sut.validate(params)

    expect(httpClientSpy.body).toBe(JSON.stringify(params.hash))
    expect(httpClientSpy.url).toBe(`${url}/${params.email}:${params.exp}`)
    expect(httpClientSpy.method).toBe('post')
  })
})
