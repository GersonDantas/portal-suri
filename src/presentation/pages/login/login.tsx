import { InputWrap, LoginHeader, FormStatus, loginState, modalState, SubmitButton } from './components'
import Styles from './login.module.scss'
import { Authentication } from 'src/domain/usecases'
import { createTokenSuri } from 'src/main/factories/cache'
import { currentCbmAuthState, FormWrap } from 'src/presentation/components'
import { Validation } from 'src/presentation/protocols'

import { IonPage } from '@ionic/react'
import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

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
  const { setCurrentCbmAuth } = useRecoilValue(currentCbmAuthState)

  useEffect(() => {
    resetLoginState()
    resetModalState()
  }, [])

  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
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
      const { tokenSession, platformUser } = session
      const userId = platformUser.id
      await setCurrentCbmAuth(createTokenSuri({ tokenSession, userId }))
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

  return (
    <IonPage>
      <FormWrap data-testid='login-form' onSubmit={handleSubmit}>
        <LoginHeader />
        <InputWrap name='email' type='email' />
        <InputWrap aria-label='senha' name='password' type='password' />
        <div className={Styles.forgotWrap}>
          <a
            data-testid='forgot-button'
            className={Styles.forgot}
            onClick={() => setModalState(old => ({ ...old, isOpen: true }))}
          >Esqueceu sua senha?</a>
        </div>
        <SubmitButton text='Fazer Login' />
        <p className={Styles.toSignup}>Não é cadastrado ainda?<Link to='/signup' data-testid='signup'> Crie sua conta</Link></p>
        <FormStatus />
      </FormWrap>
      {props.children}
    </IonPage>
  )
}

export default Login
