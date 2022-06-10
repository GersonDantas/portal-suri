import Styles from './error-page.module.scss'
import { Button } from 'src/presentation/components'

import { IonPage } from '@ionic/react'
import React from 'react'

type Props = {
  errorMessage?: string
}

const ErrorPage: React.FC<Props> = ({ errorMessage }) => {
  return (
    <IonPage>
      <div className={Styles.errorPageWrap}>
        <div className={Styles.error}>
          <span className={Styles.errorMessage} data-testid='main-error'>{errorMessage}</span>
          <Button className={Styles.button}>
            <p>Reload</p>
          </Button>
        </div>
      </div>
    </IonPage>
  )
}

export default ErrorPage
