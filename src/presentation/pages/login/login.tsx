import Styles from './login.module.scss'

import { Logo, Spinner } from 'src/presentation/components'

import React from 'react'


const Login: React.FC = () => {
  return (
    <div className={Styles.loginWrap}>
      <form className={Styles.form}>
        <header>
          <h1>
            <Logo />
          </h1>
          <h2 className={Styles.title}>
            Entre
          </h2>
          <h3 className={Styles.subtitle}>
            E encante seus clietes
          </h3>
        </header>
        <div className={Styles.inputWrap}>
          <label htmlFor='email-input' className={Styles.emailLabel}>Email</label>
          <input type='email' id='email-input' className={Styles.email} />
        </div>
        <div className={Styles.inputWrap}>
          <label htmlFor='password-input' id='password-input' className={Styles.passwordLabel}>Senha</label>
          <input type='password' id='password-input' className={Styles.password} />
        </div>
        <a href='#' className={Styles.forgot}>Esqueceu sua senha?</a>
        <button className={Styles.button} >Fazer login</button>
        <p>Não é cadastrado ainda?<a href='#'> Crie sua conta</a></p>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Error</span>
        </div>
      </form>
    </div>
  )
}

export default Login
