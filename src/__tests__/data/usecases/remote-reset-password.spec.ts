import { HttpClientSpy } from '../test'
import { RemoteResetPassword } from 'src/data/usecases'
import { ResetPassword } from 'src/domain/usecases/reset-password'

import faker from '@faker-js/faker'

const mockResetPasswordParams = (): ResetPassword.Params => ({
  email: faker.internet.email(),
  hash: faker.datatype.uuid(),
  password: faker.internet.password()
})

describe('RemoteResetPassword', () => {
  test('Should call RemoteResetPassword with correct values', () => {
    const url = faker.internet.url()
    const httpClientSpy = new HttpClientSpy()
    const sut = new RemoteResetPassword(url, httpClientSpy)
    const params = mockResetPasswordParams()

    sut.reset(params)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.body).toEqual(params)
    expect(httpClientSpy.method).toEqual('put')
  })
})
