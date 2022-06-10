import { linkValidationState } from './atom'
import { LinkValidation } from 'src/domain/usecases'
import { ErrorPage } from 'src/presentation/pages'

import { IonPage, useIonViewWillEnter } from '@ionic/react'
import queryString from 'query-string'
import React, { useCallback } from 'react'
import { RouteProps, useLocation, Route, Redirect } from 'react-router-dom'
import { useRecoilState } from 'recoil'

type Props = RouteProps & {
  linkValidation: LinkValidation
  fallbackRoute: string
}

const LinkValidationProxy: React.FC<Props> = ({ linkValidation, fallbackRoute, ...props }): JSX.Element => {
  const [state, setState] = useRecoilState(linkValidationState)
  const { search } = useLocation()
  const { email, exp, k } = queryString.parse(search)

  useIonViewWillEnter(() => {
    if (search) {
      validate()
    } else {
      setState(old => ({ ...old, urlWithParams: false }))
    }
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
        isLoading: false,
        success: false,
        mainError: error.message
      }))
    })
  }, [])

  const RenderComponent = useCallback((): JSX.Element => {
    if (state.urlWithParams) {
      if (state.isLoading) {
        return <div>isLoading...</div>
      } else {
        return state.success ? <Route {...props} /> : <ErrorPage errorMessage={state.mainError} />
      }
    } else {
      return <Redirect to={fallbackRoute} />
    }
  }, [state.isLoading, state.urlWithParams])

  return (
    <IonPage>
      <RenderComponent />
    </IonPage>
  )
}

export default LinkValidationProxy
