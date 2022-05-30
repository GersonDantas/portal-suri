import Styles from './form-status.module.scss'
import { Spinner } from 'src/presentation/components'

import React, { useEffect } from 'react'

interface Props {
  state: any
  close: () => void
}

const FormStatus: React.FC<Props> = ({ state, close }) => {
  const { isLoading, mainInfo, isError } = state

  useEffect(() => {
    setTimeout(close, 5000)
  }, [mainInfo])

  return (
    <div data-testid='error-wrap' className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {
        mainInfo &&
        <span
          data-testid='main-info'
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
              onClick={close}
              className={[Styles.iconClosed, 'cb-cross'].join(' ')}
            ></span>
          </div>
        </span>}
    </div>
  )
}

export default FormStatus
