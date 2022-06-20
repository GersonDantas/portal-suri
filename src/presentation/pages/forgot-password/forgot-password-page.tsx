import { forgotPasswordPageState, FormStatus, InputWrap, SubmitButton } from './components'
import Styles from './forgot-password-page.module.scss'
import { ResetPassword } from 'src/domain/usecases'
import { FormWrap, Logo } from 'src/presentation/components'
import { Validation } from 'src/presentation/protocols'

import { IonPage } from '@ionic/react'
import queryString from 'query-string'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'

type Props = {
  validation: Validation
  resetPassword: ResetPassword
}

const ForgotPasswordPage: React.FC<Props> = ({ validation, resetPassword }) => {
  const resetForgotPasswordPageState = useResetRecoilState(forgotPasswordPageState)
  const [state, setState] = useRecoilState(forgotPasswordPageState)
  const { search } = useLocation()
  const { email, hash } = queryString.parse(search)

  const validate = (field: string): void => {
    const { forgotPassword, forgotPasswordConfirmation } = state
    const formData = { forgotPassword, forgotPasswordConfirmation }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.forgotPasswordError || !!old.forgotPasswordConfirmationError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      setState(old => ({
        ...old,
        isLoading: true
      }))
      if (state.isLoading) return
      await resetPassword.reset({ email: `${email}`, hash: `${hash}`, password: state.forgotPassword })
    } catch (error: any) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainInfo: error.message,
        isError: true
      }))
    }
  }

  useEffect(() => resetForgotPasswordPageState(), [])
  useEffect(() => validate('forgotPassword'), [state.forgotPassword])
  useEffect(() => validate('forgotPasswordConfirmation'), [state.forgotPasswordConfirmation])

  return (
    <IonPage>
      <FormWrap data-testid='forgot-form' onSubmit={handleSubmit}>
        <h1 className={Styles.logo}>
          <Logo />
        </h1>
        <InputWrap aria-label='digite a nova senha' className={Styles.input} type='text' name='forgotPassword' />
        <InputWrap aria-label='repita a nova senha' className={Styles.input} type='text' name='forgotPasswordConfirmation' />
        <div className={Styles.buttonsWrap}>
          <SubmitButton text='Enviar' />
        </div>
        <FormStatus />
      </FormWrap>
    </IonPage>
  )
}

export default ForgotPasswordPage
