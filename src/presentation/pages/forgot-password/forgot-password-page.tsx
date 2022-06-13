import Styles from './forgot-password-page.module.scss'
import { Button, FormWrap } from 'src/presentation/components'

import React from 'react'

const ForgotPasswordPage: React.FC = () => {
  return (
    <FormWrap>
      <h3 className={Styles.title}>Digite sua nova senha</h3>
      <input
        className={Styles.input}
        type='text'
      />

      <label className={Styles.label} htmlFor='input-modal'>Repita a senha</label>
      <input
        className={Styles.input}
        type='email'
      />
      <div className={Styles.buttonsWrap}>
        <Button
          type='submit'
        >
          enviar
        </Button>
      </div>
    </FormWrap>
  )
}

export default ForgotPasswordPage
