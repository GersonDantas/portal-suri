import Styles from './form-status.module.scss'

import { Spinner } from 'src/presentation/components'

import React from 'react'

const FormStatus: React.FC = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>Error</span>
    </div>
  )
}

export default FormStatus
