import { CbmAuth } from 'src/domain/models'

import { atom } from 'recoil'

export const currentCbmAuthState = atom({
  key: 'currentCbmAuthState',
  default: {
    getCurrentCbmAuth: null as () => Promise<CbmAuth>,
    setCurrentCbmAuth: null as (cbmAuth: CbmAuth) => Promise<void>
  }
})
