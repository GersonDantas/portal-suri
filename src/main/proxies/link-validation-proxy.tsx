
import { linkValidationState } from './atom'
import { LinkValidation } from 'src/domain/usecases'
import { ErrorPage, ForgotPasswordPage } from 'src/presentation/pages'

import queryString from 'querystring'
import React, { useCallback, useEffect } from 'react'
import { Redirect, RouteProps, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'

interface Props extends RouteProps {
  linkValidation: LinkValidation
}

const LinkValidationProxy: React.FC<Props> = ({ linkValidation, ...props }): any => {
  const [state, setState] = useRecoilState(linkValidationState)
  const { search } = useLocation()
  const { email, exp, k } = queryString.parse(search)

  const validate = useCallback(async () => {
    try {
      const { success } = await linkValidation.validate({
        email: `${email}`, exp: `${exp}`, hash: `${k}`
      })
      setState(old => ({
        ...old,
        success
      }))
    } catch (error: any) {
      setState(old => ({
        ...old,
        mainError: error.message
      }))
    }
  }, [])

  useEffect(() => {
    validate()
  }, [])

  return state.success
    ? <Redirect to='/mudar-senha' exact >
      <ForgotPasswordPage />
    </Redirect>
    : <Redirect to='/erro' exact >
      <ErrorPage errorMessage={state.mainError} />
    </Redirect>
}

export default LinkValidationProxy
