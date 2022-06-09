import { errorPageState } from './atom'
import Styles from './error-page.module.scss'
import { Button } from 'src/presentation/components'

import { IonPage } from '@ionic/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

const ErrorPage: React.FC = () => {
  const mainError = useRecoilValue(errorPageState)

  return (
    <IonPage>
      <div className={Styles.errorPageWrap}>
        <div className={Styles.error}>
          <span className={Styles.errorMessage}>{mainError}</span>
          <Button className={Styles.button}>
            <p>Reload</p>
          </Button>
        </div>
      </div>
    </IonPage>
  )
}

export default ErrorPage
