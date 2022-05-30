import Styles from './form-status.module.scss'
import { Spinner } from 'src/presentation/components'

import React from 'react'

interface Props {
  state: any
}

const FormStatus: React.FC<Props> = ({ state }) => {
  const { isLoading, mainInfo, isError } = state
  return (
    <div data-testid='error-wrap' className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {
        mainInfo &&
        <span
          data-testid='main-error'
          className={[Styles.error, Styles[`${isError ? 'isError' : 'isInfo'}`]].join(' ')}
        >
          <div className={Styles.iconInfoWrap}>
            <span
              className={[Styles.iconInfo, `${isError ? 'cb-warning' : 'cb-checkmark'}`].join(' ')}
            ></span>
          </div>
          <div className={Styles.errorTextWrap}>
            <p className={Styles.errorText}>{mainInfo}</p>
            <span
              className={[Styles.iconClosed, 'cb-cross'].join(' ')}
            ></span>
          </div>
        </span>}
    </div>
  )
}

export default FormStatus
