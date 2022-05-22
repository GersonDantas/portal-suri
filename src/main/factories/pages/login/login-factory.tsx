import { makeLoginValidation } from './login-validation-factory'
import { makeRemoteAuthentication } from 'src/main/factories/usecases'
import { Login } from 'src/presentation/pages'

import React from 'react'

const makeLogin: React.FC = () => {
  return (
    <Login validation={makeLoginValidation()} authentication={makeRemoteAuthentication()} />
  )
}

export default makeLogin
