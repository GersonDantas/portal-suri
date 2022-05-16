import Styles from './login-header.module.scss'

import React from 'react'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.loginHeaderWrap}>
      <h1>
        {/* <Logo /> */}
      </h1>
      <h2 className={Styles.title}>
        Entre
      </h2>
      <h3 className={Styles.subtitle}>
        E encante seus clietes
      </h3>
    </header>
  )
}

export default LoginHeader
