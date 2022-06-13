import { LocalStorageAdapter } from 'src/infra/cache'

import 'jest-localstorage-mock'
import faker from '@faker-js/faker'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => localStorage.clear())

  test('Should call localstorage.setItem with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = { [faker.random.word()]: faker.random.word() }

    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  test('Should call localstorage.removeItem with correct key if value is undefined', () => {
    const sut = makeSut()
    const key = faker.database.column()

    sut.set(key, undefined)

    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })
})
