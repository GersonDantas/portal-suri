import { GetStorage, RemoveStorage, SetStorage } from 'src/data/protocols/http'

import { Storage } from '@capacitor/storage'
export class LocalStorageAdapter implements SetStorage, GetStorage, RemoveStorage {
  async set (key: string, value: object): Promise<any> {
    await Storage.set({ key, value: JSON.stringify(value) })
  }

  async remove (key: string): Promise<void> {
    await Storage.remove({ key })
  }

  async get (key: string): Promise<any> {
    const { value } = await Storage.get({ key })
    return JSON.parse(value)
  }
}
