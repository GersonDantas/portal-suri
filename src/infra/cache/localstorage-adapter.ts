import { SetStorage } from 'src/data/protocols/http'

export class LocalStorageAdapter implements SetStorage {
  set (key: string, value: object): any {
    value
      ? localStorage.setItem(key, JSON.stringify(value))
      : localStorage.removeItem(key)
  }
}
