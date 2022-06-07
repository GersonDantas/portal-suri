import 'src/presentation/styles/global.scss'
import { MakeLogin } from 'src/main/factories/pages'
import { ErrorPage } from 'src/presentation/pages'

import { IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

setupIonicReact()

const Router: React.FC = () => {
  return (
    <RecoilRoot>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path='/login' exact component={MakeLogin} />
          <Route path='/erro' exact component={ErrorPage} />
        </IonRouterOutlet>
      </IonReactRouter>
    </RecoilRoot>
  )
}

export default Router
