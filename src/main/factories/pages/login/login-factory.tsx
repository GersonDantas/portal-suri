import { RemoteAuthentication } from 'src/data/usecases'
import { ValidationBuilder } from 'src/main/builders'
import { Login } from 'src/presentation/pages'
import { AxiosHttpClient } from 'src/services/http'
import { ValidationComposite } from 'src/validation/validators'

import React from 'react'

const makeLogin: React.FC = () => {
  const url = 'https://portal-staging.chatbotmaker.io/api/v1/session'
  const httpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, httpClient)
  const validation = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(6).build()
  ])
  return (
    <Login validation={validation} authentication={remoteAuthentication} />
  )
}

export default makeLogin
