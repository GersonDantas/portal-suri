import 'src/presentation/styles/global.scss'
import { Login } from 'src/presentation/pages'

import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Route } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path='/login' exact component={Login} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default Router
