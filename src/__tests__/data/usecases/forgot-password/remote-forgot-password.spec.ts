import { HttpClientSpy } from 'src/__tests__/data/test'
import { RemoteForgotPassword } from 'src/data/usecases'

import faker from '@faker-js/faker'

describe('RemoteForgotPassword', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const email = faker.internet.email()
    const httpClientSpy = new HttpClientSpy()
    const sut = new RemoteForgotPassword(url, httpClientSpy)

    await sut.forgot(email)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.body).toBe(email)
    expect(httpClientSpy.method).toBe('post')
  })
})
