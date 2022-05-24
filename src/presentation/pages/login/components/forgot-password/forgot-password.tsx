import { modalState } from '..'

import Styles from './forgot-password.module.scss'
import { Button } from 'src/presentation/components'

import { IonModal } from '@ionic/react'
import React from 'react'
import { useRecoilState } from 'recoil'

const ForgotPassword: React.FC = () => {
  const [state, setState] = useRecoilState(modalState)

  return (
    <IonModal
      className={Styles.modalWrap}
      isOpen={state.isOpen}
      onDidDismiss={() => setState(old => ({ ...old, isOpen: false }))}
    >
      <div className={Styles.forgotPasswordWrap}>
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
            onClick={() => setState(old => ({ ...old, isOpen: false }))}
            className={Styles.cancel}
          >
            cancelar
          </Button>
          <Button className={Styles.send}>
            enviar
          </Button>
        </div>
      </div>
    </IonModal>
  )
}

export default ForgotPassword
