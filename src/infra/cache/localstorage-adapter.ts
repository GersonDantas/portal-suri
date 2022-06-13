import { GetStorage, SetStorage } from 'src/data/protocols/http'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set (key: string, value: object): any {
    value
      ? localStorage.setItem(key, JSON.stringify(value))
      : localStorage.removeItem(key)
  }

  get (key: string): any {
    return JSON.parse(localStorage.getItem(key))
  }
}
