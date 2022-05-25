import { HttpPostClientSpy } from 'src/__tests__/data/test'
import { RemoteForgotPassword } from 'src/data/usecases'

describe('RemoteForgotPassword', () => {
  test('Should call HttpClient with correct values', () => {
    const url = 'any_url'
    const httpClientSpy = new HttpPostClientSpy()
    const sut = new RemoteForgotPassword(url, httpClientSpy)

    sut.forgot('any_email')

    expect(httpClientSpy.url).toBe(url)
  })
})
