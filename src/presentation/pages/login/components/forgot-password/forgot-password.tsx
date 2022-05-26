import { modalState } from '..'

import Styles from './forgot-password.module.scss'
import { Button } from 'src/presentation/components'

import { IonModal } from '@ionic/react'

import { Validation } from 'src/presentation/protocols'

import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

interface Props {
  validation: Validation
}

const ForgotPassword: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useRecoilState(modalState)

  const submitOrCancel = (): void => {
    if (!state.forgot) setState(old => ({ ...old, isOpen: false }))
  }

  useEffect(() => {
    setState(old => ({
      ...old,
      forgotError: validation.validate('forgot', state.forgot)
    }))
  }, [state.forgot])

  return (
    <IonModal
      className={Styles.modalWrap}
      isOpen={state.isOpen}
      onDidDismiss={() => setState(old => ({ ...old, isOpen: false }))}
    >
      <div
        data-testid='forgot-wrap' className={Styles.forgotPasswordWrap}
      >
        <h3 className={Styles.title}>Esqueceu a senha?</h3>
        <label className={Styles.label} htmlFor='input-modal'>Qual o e-mail do cadastro?</label>
        <input
          className={Styles.input}
          type='email'
          name='forgot'
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
            data-testid='forgot-submit'
            className={Styles.send}
            onClick={submitOrCancel}
          >
            enviar
          </Button>
        </div>
      </div>
    </IonModal>
  )
}

export default ForgotPassword
