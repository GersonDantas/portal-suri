import { modalState } from '..'

import Styles from './forgot-password.module.scss'
import { Button } from 'src/presentation/components'

import { IonModal } from '@ionic/react'

import { Validation } from 'src/presentation/protocols'

import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { ForgotYourPassword } from 'src/domain/usecases'

interface Props {
  validation: Validation
  forgotYourPassword: ForgotYourPassword
}

const ForgotPassword: React.FC<Props> = ({ validation, forgotYourPassword }) => {
  const [state, setState] = useRecoilState(modalState)

  const submitOrCancel = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (!state.forgotEmail) {
      setState(old => ({ ...old, isOpen: false }))
    }

    forgotYourPassword.sendEmail(state.forgotEmail)
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
        className={Styles.forgotPasswordWrap}
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
            onClick={() => setState(old => ({ ...old, isOpen: false }))}
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
