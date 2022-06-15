import { mockCbmAuth } from 'src/__tests__/domain/mocks'
import { LocalStorageAdapter } from 'src/infra/http/cache/localstorage-adapter'
import { getCurrentCbmAuthAdapter, setCurrentCbmAuthAdapter } from 'src/main/adapters'

jest.mock('src/infra/http/cache/localstorage-adapter')

describe('CurrentCbmAuthAdapter', () => {
  test('Should call LocalStorageAdapter.set with correct values', () => {
    const cbmAuth = mockCbmAuth()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    setCurrentCbmAuthAdapter(cbmAuth)

    expect(setSpy).toHaveBeenLastCalledWith('cbm.auth', cbmAuth)
  })

  test('Should call LocalStorageAdapter.set with correct values', async () => {
    const cbmAuth = mockCbmAuth()
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(Promise.resolve(cbmAuth))

    const result = await getCurrentCbmAuthAdapter()

    expect(getSpy).toHaveBeenLastCalledWith('cbm.auth')
    expect(result).toBe(cbmAuth)
  })
})
