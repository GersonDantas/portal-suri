import { mockForgotPasswordResponseModel } from 'src/__tests__/data/mock'
import { HttpClientSpy } from 'src/__tests__/data/test'
import { HttpStatusCode } from 'src/data/protocols/http'
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
  statusCode?: HttpStatusCode
}

const makeSut = ({ url, body, statusCode }: SutParams = {
  url: faker.internet.url(),
  body: faker.random.arrayElement([undefined, null, {}])
}): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteForgotPassword.Model>({ statusCode: statusCode ?? 200, body })
  const sut = new RemoteForgotPassword(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

const setError = async (type: 0 | 1): Promise<void> => {
  const body = mockForgotPasswordResponseModel({ type })
  const { sut } = makeSut({ body })
  const promise = sut.sendEmail(faker.internet.email())

  await expect(promise).rejects.toThrow(type === 1 ? new IsFacebookError() : new UserNotFoundError())
}

describe('RemoteForgotPassword', () => {
  test('Should call HttpClient with correct values', async () => {
    const body = mockForgotPasswordResponseModel({ success: true })
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

  test('Should ensure RemoteForgotPassword returns IsFacebookUserError if user from facebook',
    async () => await setError(1)
  )

  test('Should ensure RemoteForgotPassword returns UserNotFoundError if not find user',
    async () => await setError(0)
  )

  test('Should ensure RemoteForgotPassword returns UnexpectedError if body is empty', async () => {
    const { sut } = makeSut()

    const promise = sut.sendEmail(faker.internet.email())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should ensure RemoteForgotPassword returns success if reset link sent', async () => {
    const body = mockForgotPasswordResponseModel({ success: true })
    const { sut } = makeSut({ body })

    const forgotPasswordResponse = await sut.sendEmail(faker.internet.email())

    expect(forgotPasswordResponse.success).toBe(body.success)
    expect(forgotPasswordResponse.type).toBe(body.type)
  })

  test('Should ensure RemoteForgotPassword returns UnexpectedError if statusCode is different from 200', async () => {
    const { sut } = makeSut({ statusCode: 415 })

    const promise = sut.sendEmail(faker.internet.email())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
