import { errorPageState } from './atom'
import Styles from './error-page.module.scss'
import { Button } from 'src/presentation/components'

import { IonPage } from '@ionic/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

type Props = {
  errorMessage?: string
}

const ErrorPage: React.FC<Props> = ({ errorMessage }) => {
  const mainError = useRecoilValue(errorPageState)

  return (
    <IonPage>
      <div className={Styles.errorPageWrap}>
        <div className={Styles.error}>
          <span className={Styles.errorMessage} data-testid='main-error'>{
            errorMessage || mainError || 'Algo errado aconteceu!'
          }</span>
          <Button className={Styles.button}>
            <p>Página de Login</p>
          </Button>
        </div>
      </div>
    </IonPage>
  )
}

export default ErrorPage
