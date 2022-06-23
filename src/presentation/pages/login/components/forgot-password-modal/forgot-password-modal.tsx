import { modalState } from '..'

import { loginState } from '../atoms'
import Styles from './forgot-password-modal.module.scss'
import { Button } from 'src/presentation/components'
import { Validation } from 'src/presentation/protocols'
import { ForgotYourPassword } from 'src/domain/usecases'

import { IonModal, useIonViewWillEnter } from '@ionic/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { UnexpectedError } from 'src/domain/errors'
import { Input, SubmitButton } from './components'

interface Props {
  validation: Validation
  forgotYourPassword: ForgotYourPassword
}

const ForgotPasswordModal: React.FC<Props> = ({ validation, forgotYourPassword }) => {
  const [state, setState] = useRecoilState(modalState)
  const [stateLogin, setStateLogin] = useRecoilState(loginState)

  useIonViewWillEnter(() => validate('forgotEmail'))
  useEffect(() => validate('forgotEmail'), [state.forgotEmail])

  const validate = (field: string): void => {
    const { forgotEmail } = state
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, { forgotEmail }) }))
    setState(old => ({ ...old, isFormInvalid: !!old.forgotEmailError }))
  }

  const modalCancelClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    setState(old => ({ ...old, isOpen: false }))
  }

  const submitOrCancel = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    try {
      if (stateLogin.isLoading || state.isFormInvalid) {
        return
      }

      setStateLogin(old => ({ ...old, isLoading: true }))

      const forgotResponse = await forgotYourPassword.sendEmail(state.forgotEmail)

      if (forgotResponse?.success) {
        setState(old => ({ ...old, isOpen: false }))
        setStateLogin(old => ({
          ...old,
          isLoading: false,
          mainInfo: 'Um e-mail foi enviado para o endereço de e-mail informado',
          isError: false
        }))
      } else {
        throw new UnexpectedError()
      }
    } catch (error: any) {
      setStateLogin(old => ({
        ...old,
        isLoading: false,
        mainInfo: error.message,
        isError: true
      }))
      setState(old => ({ ...old, isOpen: false }))
    }
  }

  return (
    <IonModal
      className={Styles.modalWrap}
      isOpen={state.isOpen}
      onDidDismiss={() => setState(old => ({ ...old, isOpen: false }))}
    >
      <form
        onSubmit={submitOrCancel}
        data-testid='forgot-form'
        className={Styles.formForgot}
      >
        <h3 className={Styles.title}>Esqueceu a senha?</h3>
        <label className={Styles.label} htmlFor='input-modal'>Qual o e-mail do cadastro?</label>
        <Input className={Styles.input} type='email' name='forgotEmail' />
        <div className={Styles.buttonsWrap}>
          <Button
            data-testid='forgot-cancel'
            onClick={modalCancelClick}
            className={Styles.cancel}
          >
            cancelar
          </Button>
          <SubmitButton text='Enviar' />
        </div>
      </form>
    </IonModal>
  )
}

export default ForgotPasswordModal
