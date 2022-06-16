import Styles from './forgot-password-page.module.scss'
import { Button, FormWrap, Logo } from 'src/presentation/components'
import { FormStatus } from 'src/presentation/pages/forgot-password/components'

import React from 'react'

const ForgotPasswordPage: React.FC = () => {
  return (
    <FormWrap>
      <h1 className={Styles.logo}>
        <Logo />
      </h1>
      <h3 className={Styles.title}>Digite sua nova senha</h3>
      <input
        className={Styles.input}
        type='text'
      />

      <label className={Styles.label} htmlFor='input-modal'>Repita a senha</label>
      <input
        className={Styles.input}
        type='text'
      />
      <div className={Styles.buttonsWrap}>
        <Button
          type='submit'
        >
          enviar
        </Button>
      </div>
      <FormStatus />
    </FormWrap>
  )
}

export default ForgotPasswordPage
