import { InputWrap, LoginHeader } from './components'
import Styles from './login.module.scss'

import { FormStatus } from 'src/presentation/components'

import React from 'react'


const Login: React.FC = () => {
  return (
    <div className={Styles.loginWrap}>
      <form className={Styles.form}>
        <LoginHeader />
        <InputWrap className={Styles.email} label='email' />
        <InputWrap className={Styles.password} label='password' />
        <a href='#' className={Styles.forgot}>Esqueceu sua senha?</a>
        <button className={Styles.button} >Fazer login</button>
        <p>Não é cadastrado ainda?<a href='#'> Crie sua conta</a></p>
        <FormStatus />
      </form>
    </div>
  )
}

export default Login
