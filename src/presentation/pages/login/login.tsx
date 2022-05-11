import { InputWrap, LoginHeader, FormStatus, loginState } from './components'
import Styles from './login.module.scss'


import { Validation } from 'src/presentation/protocols'

import { IonPage } from '@ionic/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useRecoilState(loginState)

  useEffect(() => {
    setState(old => ({
      ...old,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    }))
  }, [state.email, state.password])

  return (
    <IonPage>
      <div className={Styles.loginWrap}>
        <form className={Styles.form}>
          <LoginHeader />
          <InputWrap className={Styles.email} name='email' type='email' />
          <InputWrap className={Styles.password} name='password' type='password' />
          <a href='#' className={Styles.forgot}>Esqueceu sua senha?</a>
          <button disabled data-testid='submit' className={Styles.submit} >Fazer login</button>
          <p>Não é cadastrado ainda?<a href='#'> Crie sua conta</a></p>
          <FormStatus />
        </form>
      </div>
    </IonPage>
  )
}

export default Login
