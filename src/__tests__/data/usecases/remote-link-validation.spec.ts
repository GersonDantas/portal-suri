import { HttpClientSpy } from '../test'
import { LinkValidationResponseType } from 'src/data/models/link-validation-response'
import { RemoteLinkValidation } from 'src/data/usecases'
import { LinkValidation } from 'src/domain/usecases'

describe('RemoteLinkValidation', () => {
  test('Should call RemoteLinkValidation with correct values', () => {
    const body = {
      success: false,
      type: LinkValidationResponseType.InvalidResetLink
    }

    const params = {
      hash: 'any_hash',
      email: 'any_email',
      exp: new Date()
    }
    const url = 'any_url'
    const httpClientSpy = new HttpClientSpy<LinkValidation.Response>({ statusCode: 200, body })
    const sut = new RemoteLinkValidation(url, httpClientSpy)

    sut.validate(params)

    expect(httpClientSpy.body).toBe(JSON.stringify(params.hash))
    expect(httpClientSpy.url).toBe(`${url}/${params.email}:${params.exp}`)
    expect(httpClientSpy.method).toBe('post')
  })
})
