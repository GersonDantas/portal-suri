import Styles from './error-page.module.scss'
import { Button } from 'src/presentation/components'

import { IonPage } from '@ionic/react'
import React from 'react'

type Props = {
  errorMessage: string
  goFallBack: () => void
}

const ErrorPage: React.FC<Props> = ({ errorMessage, goFallBack }) => {
  return (
    <IonPage>
      <div className={Styles.errorPageWrap}>
        <div className={Styles.error}>
          <span className={Styles.errorMessage} data-testid='main-error'>{errorMessage}</span>
          <Button className={Styles.button} data-testid='go-fall-back' onClick={() => goFallBack()}>
            <p>Inicio</p>
          </Button>
        </div>
      </div>
    </IonPage>
  )
}

export default ErrorPage
