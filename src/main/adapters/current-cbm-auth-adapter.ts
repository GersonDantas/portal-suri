import { makeLocalStorageAdapter } from '../factories/cache/local-storage-adapter-factory'
import { CbmAuth } from 'src/domain/models'

export const setCurrentCbmAuthAdapter = async (cbmAuth: CbmAuth): Promise<void> => {
  makeLocalStorageAdapter().set('cbm.auth', cbmAuth)
}

export const getCurrentCbmAuthAdapter = async (): Promise<CbmAuth> => {
  return await makeLocalStorageAdapter().get<CbmAuth>('cbm.auth')
}
