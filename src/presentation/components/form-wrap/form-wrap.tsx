import Styles from './form-wrap.module.scss'

import React from 'react'

type Props = React.FormHTMLAttributes<HTMLFormElement>

const FormWrap: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div className={Styles.formWrap}>
      <form {...props} className={Styles.form} >
        {children}
      </form>
    </div>
  )
}

export default FormWrap
