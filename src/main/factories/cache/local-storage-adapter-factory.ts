import { LocalStorageAdapter } from 'src/infra/http'

export const makeLocalStorageAdapter = (): LocalStorageAdapter => new LocalStorageAdapter()
