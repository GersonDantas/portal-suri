import 'src/presentation/styles/global.scss'
import { MockMakeValidationLinkProxy } from 'src/__tests__/main/factories/mock'
import { getCurrentCbmAuthAdapter, setCurrentCbmAuthAdapter } from 'src/main/adapters'
import { MakeLogin } from 'src/main/factories/pages'
import { currentCbmAuthState } from 'src/presentation/components'

import { IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Route } from 'react-router-dom'
import { MutableSnapshot, RecoilRoot } from 'recoil'

setupIonicReact()

const Router: React.FC = () => {
  const state = {
    getCurrentCbmAuth: getCurrentCbmAuthAdapter,
    setCurrentCbmAuth: setCurrentCbmAuthAdapter
  }
  return (
    <RecoilRoot initializeState={({ set }: MutableSnapshot) => set(currentCbmAuthState, state)}>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path='/login' exact component={MakeLogin} />
          <MockMakeValidationLinkProxy success />
        </IonRouterOutlet>
      </IonReactRouter>
    </RecoilRoot>
  )
}

export default Router
