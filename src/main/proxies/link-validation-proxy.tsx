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
}

const LinkValidationProxy: React.FC<Props> = ({ linkValidation, ...props }): any => {
  const [state, setState] = useRecoilState(linkValidationState)
  const { search } = useLocation()
  const { email, exp, k } = queryString.parse(search)

  useIonViewWillEnter(() => {
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
        isLoading: false,
        success: false,
        mainError: error.message
      }))
    })
  }, [])

  return (
    <IonPage>
      {state.isLoading
        ? <div>isLoading...</div>
        : state.success
          ? <Route {...props} />
          : <>
            <Redirect to='/erro' />
            <ErrorPage errorMessage={state.mainError} />
          </>
      }
    </IonPage>
  )
}

export default LinkValidationProxy
