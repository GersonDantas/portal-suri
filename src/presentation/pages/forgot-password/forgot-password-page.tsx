import { FormStatus, InputWrap } from './components'
import Styles from './forgot-password-page.module.scss'
import { Button, FormWrap, Logo } from 'src/presentation/components'

import React from 'react'

const ForgotPasswordPage: React.FC = () => {
  return (
    <FormWrap>
      <h1 className={Styles.logo}>
        <Logo />
      </h1>
      <InputWrap aria-label='digite a nova senha' className={Styles.input} type='text' name='forgotPassword' />
      <InputWrap aria-label='repita a nova senha' className={Styles.input} type='text' name='forgotPasswordConfirmation' />
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
