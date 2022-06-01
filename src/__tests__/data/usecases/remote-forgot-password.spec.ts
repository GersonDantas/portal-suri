import { mockForgotPasswordResponse } from '../mock'
import { HttpClientSpy } from 'src/__tests__/data/test'
import { ForgotPasswordResponseType } from 'src/data/models'
import { RemoteForgotPassword } from 'src/data/usecases'
import { IsFacebookError, UnexpectedError, UserNotFoundError } from 'src/domain/errors'

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
    const body = mockForgotPasswordResponse({ success: true })
    const url = faker.internet.url()
    const { httpClientSpy, sut } = makeSut({ url, body })
    const email = faker.internet.email()

    await sut.sendEmail(email)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.body).toBe(JSON.stringify(email))
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.headers).toEqual({
      'content-type': 'application/json; charset=utf-8'
    })
  })

  test('Should ensure RemoteForgotPassword returns IsFacebookUserError or UserNotFoundError if user error', async () => {
    const body = mockForgotPasswordResponse()
    const { sut } = makeSut({ body })
    const promise = sut.sendEmail(faker.internet.email())

    await expect(promise).rejects.toThrow(
      body.type === ForgotPasswordResponseType.IsFacebookUser
        ? new IsFacebookError()
        : new UserNotFoundError()
    )
  })

  test('Should ensure RemoteForgotPassword returns UnexpectedError if body is empty', async () => {
    const body = {}
    const { sut } = makeSut({ body })

    const promise = sut.sendEmail(faker.internet.email())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should ensure RemoteForgotPassword returns success if reset link sent', async () => {
    const body = mockForgotPasswordResponse({ success: true })
    const { sut } = makeSut({ body })

    const forgotPasswordResponse = await sut.sendEmail(faker.internet.email())

    expect(forgotPasswordResponse.success).toBe(body.success)
    expect(forgotPasswordResponse.type).toBe(body.type)
  })
})
