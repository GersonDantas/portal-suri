import { modalState } from '..'

import { loginState } from '../atom'
import Styles from './forgot-password.module.scss'
import { Button } from 'src/presentation/components'
import { Validation } from 'src/presentation/protocols'
import { ForgotYourPassword } from 'src/domain/usecases'

import { IonModal } from '@ionic/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { UnexpectedError } from 'src/domain/errors'

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
      setState(old => ({ ...old, isOpen: false }))
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
