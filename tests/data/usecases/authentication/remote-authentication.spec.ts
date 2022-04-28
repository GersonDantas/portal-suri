import { HttpPostClientSpy } from '@/tests/data/test'
import { RemoteAuthentication } from '@/data/usecases'

type SutTypes = {
  url: string
  httpPostClientSpy: HttpPostClientSpy
  sut: RemoteAuthentication
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    url,
    httpPostClientSpy,
    sut
  }
}

describe('RemoteAuthentication', () => {
  test('Should  call HttpPostClient with correct URL', async () => {
    const url = 'other_url'
    const { httpPostClientSpy, sut } = makeSut(url)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
