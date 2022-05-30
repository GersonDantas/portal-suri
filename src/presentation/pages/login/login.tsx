import { InputWrap, LoginHeader, FormStatus, loginState, modalState } from './components'
import Styles from './login.module.scss'
import { Authentication } from 'src/domain/usecases'
import { createTokenSuri } from 'src/main/factories/cache'
import Button from 'src/presentation/components/button/button'
import { Validation } from 'src/presentation/protocols'

import { IonPage, useIonViewDidLeave } from '@ionic/react'
import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'

interface Props {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication, ...props }) => {
  const history = useHistory()
  const resetLoginState = useResetRecoilState(loginState)
  const resetModalState = useResetRecoilState(modalState)
  const [state, setState] = useRecoilState(loginState)
  const setModalState = useSetRecoilState(modalState)

  useIonViewDidLeave(() => {
    resetLoginState()
    resetModalState()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState(old => ({
        ...old,
        isLoading: true
      }))
      const session = await authentication.auth({
        email: state.email,
        password: state.password
      })
      localStorage.setItem('accessToken', createTokenSuri(
        session.tokenSession,
        session.platformUser.id
      ))
      history.replace('/')
    } catch (error: any) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainInfo: error.message,
        isError: true
      }))
    }
  }

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
        <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
          <LoginHeader />
          <InputWrap className={Styles.email} name='email' type='email' />
          <InputWrap className={Styles.password} name='password' type='password' />
          <a
            data-testid='forgot-button'
            className={Styles.forgot}
            onClick={() => setModalState(old => ({ ...old, isOpen: true }))}
          >Esqueceu sua senha?</a>
          <Button disabled={!!state.emailError || !!state.passwordError} data-testid='submit' className={Styles.submit} >Fazer login</Button>
          <p>Não é cadastrado ainda?<Link to='/signup' data-testid='signup'> Crie sua conta</Link></p>
          <FormStatus />
        </form>
      </div>
      {props.children}
    </IonPage>
  )
}

export default Login
