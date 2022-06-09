import { linkValidationState } from './atom'
import { LinkValidation } from 'src/domain/usecases'
import { errorPageState } from 'src/presentation/pages/error-page/atom'

import { IonPage, useIonViewWillEnter } from '@ionic/react'
import queryString from 'query-string'
import React, { useCallback } from 'react'
import { RouteProps, useLocation, Redirect, Route } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'

type Props = RouteProps & {
  linkValidation: LinkValidation
}

const LinkValidationProxy: React.FC<Props> = ({ linkValidation, ...props }): any => {
  const [state, setState] = useRecoilState(linkValidationState)
  const setMainError = useSetRecoilState(errorPageState)
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
      console.log(error)
      setState(old => ({
        ...old,
        isLoading: false
      }))
      setMainError(error.message)
    })
  }, [])

  return (
    <IonPage>
      {state.isLoading
        ? <div>isLoading...</div>
        : state.success
          ? <Route {...props} />
          : <Route {...props} component={() => <Redirect to='/erro' />} />
      }
    </IonPage>
  )
}

export default LinkValidationProxy
