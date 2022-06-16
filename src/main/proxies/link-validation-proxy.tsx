import { linkValidationState } from './atoms'
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

  const goFallBackRoute = (): void => {
    setState(old => ({ ...old, urlWithParams: false }))
  }

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

  const RenderComponent = useCallback((): JSX.Element => {
    if (state.urlWithParams) {
      return state.success
        ? <Route {...props} />
        : <ErrorPage goFallBack={goFallBackRoute} errorMessage={state.mainError} />
    } else {
      return <Redirect to={fallbackRoute} />
    }
  }, [state.urlWithParams, state.success, state.mainError])

  return (
    <IonPage>
      <RenderComponent />
    </IonPage>
  )
}

export default LinkValidationProxy
