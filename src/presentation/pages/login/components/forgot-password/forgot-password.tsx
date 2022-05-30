import { modalState } from '..'

import Styles from './forgot-password.module.scss'
import { Button } from 'src/presentation/components'
import { Validation } from 'src/presentation/protocols'
import { ForgotYourPassword } from 'src/domain/usecases'

import { IonModal } from '@ionic/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { loginState } from '../atom'

interface Props {
  validation: Validation
  forgotYourPassword: ForgotYourPassword
}

const ForgotPassword: React.FC<Props> = ({ validation, forgotYourPassword }) => {
  const [state, setState] = useRecoilState(modalState)
  const [stateLogin, setStateLogin] = useRecoilState(loginState)

  const modalCancelClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    setState(old => ({ ...old, isOpen: false }))
  }

  const submitOrCancel = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    try {
      if (!state.forgotEmail) {
        setState(old => ({ ...old, isOpen: false }))
      } else if (stateLogin.isLoading || state.forgotError) {
        return
      }

      setStateLogin(old => ({ ...old, isLoading: true }))

      await forgotYourPassword.sendEmail(state.forgotEmail)
    } catch (error: any) {
      setStateLogin(old => ({
        ...old,
        isLoading: false,
        mainInfo: error.message,
        isError: true
      }))
    }
  }

  useEffect(() => {
    setState(old => ({
      ...old,
      forgotError: validation.validate('forgot', state.forgotEmail)
    }))
  }, [state.forgotEmail])

  return (
    <IonModal
      className={Styles.modalWrap}
      isOpen={state.isOpen}
      onDidDismiss={() => setState(old => ({ ...old, isOpen: false }))}
    >
      <form
        onSubmit={submitOrCancel}
        data-testid='form-forgot'
        className={Styles.formForgot}
      >
        <h3 className={Styles.title}>Esqueceu a senha?</h3>
        <label className={Styles.label} htmlFor='input-modal'>Qual o e-mail do cadastro?</label>
        <input
          className={Styles.input}
          type='email'
          name='forgotEmail'
          data-testid='input-forgot'
          title={state.forgotError || 'ok'}
          id='input-modal'
          onChange={e => setState(old => ({ ...old, [e.target.name]: e.target.value }))}
        />
        <div className={Styles.buttonsWrap}>
          <Button
            data-testid='forgot-cancel'
            onClick={modalCancelClick}
            className={Styles.cancel}
          >
            cancelar
          </Button>
          <Button
            type='submit'
            data-testid='forgot-submit'
            className={Styles.send}
          >
            enviar
          </Button>
        </div>
      </form>
    </IonModal>
  )
}

export default ForgotPassword
