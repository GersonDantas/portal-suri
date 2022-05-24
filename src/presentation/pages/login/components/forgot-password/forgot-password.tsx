import { modalState } from '..'

import Styles from './forgot-password.module.scss'
import { Button } from 'src/presentation/components'

import { IonModal } from '@ionic/react'
import React from 'react'
import { useRecoilState } from 'recoil'

const ForgotPassword: React.FC = () => {
  const [state, setState] = useRecoilState(modalState)

  const submitOrCancel = (): void => {
    if (!state.inputModal) setState(old => ({ ...old, isOpen: false }))
  }

  return (
    <IonModal
      className={Styles.modalWrap}
      isOpen={state.isOpen}
      onDidDismiss={() => setState(old => ({ ...old, isOpen: false }))}
    >
      <div
        data-testid='forgot-wrap' className={Styles.forgotPasswordWrap}>
        <h3 className={Styles.title}>Esqueceu a senha?</h3>
        <label className={Styles.label} htmlFor='input-modal'>Qual o e-mail do cadastro?</label>
        <input
          className={Styles.input}
          type='email'
          name='inputModal'
          id='input-modal'
          value={state.inputModal}
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
