import { HttpClientSpy } from 'src/__tests__/data/test'
import { RemoteForgotPassword } from 'src/data/usecases'

describe('RemoteForgotPassword', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = 'any_url'
    const httpClientSpy = new HttpClientSpy()
    const sut = new RemoteForgotPassword(url, httpClientSpy)

    await sut.forgot('any_email')

    expect(httpClientSpy.url).toBe(url)
  })
})
