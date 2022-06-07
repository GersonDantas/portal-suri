import Styles from './error-page.module.scss'
import { Button } from 'src/presentation/components'

import React from 'react'

type Props = {
  errorMessage: string
}

const ErrorPage: React.FC<Props> = ({ errorMessage }) => {
  return (
    <div className={Styles.errorPageWrap}>
      <div className={Styles.error}>
        <span className={Styles.errorMessage}>{errorMessage ?? 'Erro, não obtivemos resposta'}</span>
        <Button className={Styles.button}>
          <p>Reload</p>
        </Button>
      </div>
    </div>
  )
}

export default ErrorPage
