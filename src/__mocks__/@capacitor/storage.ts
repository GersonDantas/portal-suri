// import { Storage as storage } from '@capacitor/storage'

type getDataType = { key: string }
type removeDataType = { key: string }
type getReturnType = { value: any }
type setDataType = {
  key: string
  value: object
}

export const Storage = {
  async get (data: getDataType): Promise<getReturnType> {
    return { value: undefined }
  },

  async set (data: setDataType): Promise<void> { },

  async remove (data: removeDataType): Promise<void> { },

  async clear (): Promise<void> { }
}
