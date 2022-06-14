import { LocalStorageAdapter } from 'src/infra/http'

/**
 * * explicação aqui: https://capacitorjs.com/docs/guides/mocking-plugins
 * ! '@capacitor/storage' está da pegando da pasta __mock__
**/
import { Storage } from '@capacitor/storage'
import faker from '@faker-js/faker'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  afterEach(jest.clearAllMocks)

  test('Should call localstorage.setItem with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = { [faker.random.word()]: faker.random.word() }
    Storage.set = jest.fn().mockResolvedValue(undefined)

    sut.set(key, value)

    expect(Storage.set).toHaveBeenCalledWith({ key, value: JSON.stringify(value) })
  })

  test('Should call localstorage.removeItem with correct key', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    Storage.remove = jest.fn().mockResolvedValue(undefined)

    sut.remove(key)

    expect(Storage.remove).toHaveBeenCalledWith({ key })
  })

  test('Should call localstorage.getItem returns correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = JSON.stringify({ [faker.random.word()]: faker.random.word() })
    Storage.get = jest.fn().mockImplementation(
      async (data: { key: string }): Promise<{ value: string }> => {
        return { value }
      }
    )

    const obj = await sut.get(key)

    expect(obj).toEqual(JSON.parse(value))
    expect(Storage.get).toHaveBeenCalledWith({ key })
  })
})
