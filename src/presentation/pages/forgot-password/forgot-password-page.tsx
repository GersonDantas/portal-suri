import { forgotPasswordPageState, FormStatus, InputWrap } from './components'
import Styles from './forgot-password-page.module.scss'
import { Button, FormWrap, Logo } from 'src/presentation/components'
import { Validation } from 'src/presentation/protocols'

import { IonPage } from '@ionic/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

type Props = {
  validation: Validation
}

const ForgotPasswordPage: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useRecoilState(forgotPasswordPageState)

  const validate = (field: string): void => {
    const { forgotPassword, forgotPasswordConfirmation } = state
    const formData = { forgotPassword, forgotPasswordConfirmation }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
  }

  useEffect(() => validate('forgotPassword'), [state.forgotPassword])
  useEffect(() => validate('forgotPasswordConfirmation'), [state.forgotPasswordConfirmation])

  return (
    <IonPage>
      <FormWrap>
        <h1 className={Styles.logo}>
          <Logo />
        </h1>
        <InputWrap aria-label='digite a nova senha' className={Styles.input} type='text' name='forgotPassword' />
        <InputWrap aria-label='repita a nova senha' className={Styles.input} type='text' name='forgotPasswordConfirmation' />
        <div className={Styles.buttonsWrap}>
          <Button
            type='submit'
            data-testid='submit-forgot'
            disabled={true}
          >
            enviar
          </Button>
        </div>
        <FormStatus />
      </FormWrap>
    </IonPage>
  )
}

export default ForgotPasswordPage
