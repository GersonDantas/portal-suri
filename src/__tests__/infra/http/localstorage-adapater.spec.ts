import { SetStorage } from 'src/data/protocols/http'

import 'jest-localstorage-mock'
import faker from '@faker-js/faker'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

class LocalStorageAdapter implements SetStorage {
  set (key: string, value: object): any {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

describe('LocalStorageAdapter', () => {
  beforeEach(() => localStorage.clear())

  test('Should call localstorage.setItem with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = { [faker.random.word()]: faker.random.word() }

    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
})
