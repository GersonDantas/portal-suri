import { linkValidationState } from './atom'
import { LinkValidation } from 'src/domain/usecases'
import { ErrorPage } from 'src/presentation/pages'

import queryString from 'query-string'
import React, { useCallback, useEffect } from 'react'
import { RouteProps, useLocation, Redirect, Route } from 'react-router-dom'
import { useRecoilState } from 'recoil'

type Props = RouteProps & {
  linkValidation: LinkValidation
}

const LinkValidationProxy: React.FC<Props> = ({ linkValidation, ...props }): any => {
  const [state, setState] = useRecoilState(linkValidationState)
  const { search } = useLocation()
  const { email, exp, k } = queryString.parse(search)

  useEffect(() => {
    validate()
  }, [])

  const validate = useCallback(() => {
    linkValidation.validate({
      email: `${email}`, exp: `${exp}`, hash: `${k}`
    }).then(({ success }) => {
      setState(old => ({
        ...old,
        success,
        isLoading: false
      }))
    }).catch((error) => {
      setState(old => ({
        ...old,
        mainError: error.message,
        isLoading: false
      }))
    })
  }, [])

  if (state.isLoading) {
    return <div>isLoading...</div>
  } else {
    return state.success
      ? <Route {...props} />
      : <Redirect to='/erro' >
        <ErrorPage errorMessage={state.mainError} />
      </Redirect>
  }
}

export default LinkValidationProxy
