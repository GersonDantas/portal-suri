import Styles from './forgot-password-page.module.scss'
import { Button } from 'src/presentation/components'

import React from 'react'

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className={Styles.forgotPasswordWrap}>
      <form
        className={Styles.formForgot}
      >
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
            className={Styles.send}
          >
            enviar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
