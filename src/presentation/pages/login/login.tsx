import Styles from './login.module.scss'

import { Logo, Spinner } from 'src/presentation/components'

import React from 'react'

const Login: React.FC = () => {
  return (
    <div className={Styles.loginWrap}>
      <form className={Styles.form}>
        <header>
          <Spinner />
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
        <label htmlFor='email-input' className={Styles.emailLabel}>Email</label>
        <input type='email' id='email-input' className={Styles.email} />
        <label htmlFor='password-input' id='password-input' className={Styles.passwordLabel}>Senha</label>
        <input type='password' id='password-input' className={Styles.password} />
        <a href='#' className={Styles.forgot}>Esqueceu sua senha?</a>
        <button className={Styles.button} >Fazer login</button>
        <p>Não é cadastrado ainda?<a href='#'> Crie sua conta</a></p>
      </form>
    </div>
  )
}

export default Login
