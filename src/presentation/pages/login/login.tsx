import { InputWrap, LoginHeader, FormStatus, loginState } from './components'
import Styles from './login.module.scss'


import { IonPage } from '@ionic/react'
import React from 'react'
import { useRecoilValue } from 'recoil'


const Login: React.FC = () => {
  const { isFormValid } = useRecoilValue(loginState)
  return (
    <IonPage>
      <div className={Styles.loginWrap}>
        <form className={Styles.form}>
          <LoginHeader />
          <InputWrap className={Styles.email} label='email' />
          <InputWrap className={Styles.password} label='password' />
          <a href='#' className={Styles.forgot}>Esqueceu sua senha?</a>
          <button disabled={isFormValid} data-testid='submit' className={Styles.submit} >Fazer login</button>
          <p>Não é cadastrado ainda?<a href='#'> Crie sua conta</a></p>
          <FormStatus />
        </form>
      </div>
    </IonPage>
  )
}

export default Login
