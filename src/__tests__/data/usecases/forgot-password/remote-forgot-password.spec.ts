import { HttpClientSpy } from 'src/__tests__/data/test'
import { ForgotPasswordResponseType } from 'src/data/models'
import { RemoteForgotPassword } from 'src/data/usecases'
import { IsFacebookError } from 'src/domain/errors/is-facebook-error'

import faker from '@faker-js/faker'

type SutTypes = {
  sut: RemoteForgotPassword
  httpClientSpy: HttpClientSpy
}

type SutParams = {
  url?: string
  body?: any
}

const makeSut = ({ url, body }: SutParams = { url: faker.internet.url(), body: {} }): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteForgotPassword.Model>({ statusCode: 200, body })
  const sut = new RemoteForgotPassword(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteForgotPassword', () => {
  test('Should call HttpClient with correct values', async () => {
    const body = {
      success: true,
      type: ForgotPasswordResponseType.ResetLinkSent
    }
    const url = faker.internet.url()
    const { httpClientSpy, sut } = makeSut({ url, body })
    const email = faker.internet.email()

    await sut.forgot(email)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.body).toBe(email)
    expect(httpClientSpy.method).toBe('post')
  })

  test('Should ensure RemoteForgotPassword returns IsFacebookUserError if facebook user', async () => {
    const body = {
      success: false,
      type: ForgotPasswordResponseType.IsFacebookUser
    }
    const { sut } = makeSut({ body })

    const promise = sut.forgot(faker.internet.email())

    await expect(promise).rejects.toThrow(new IsFacebookError())
  })
})
