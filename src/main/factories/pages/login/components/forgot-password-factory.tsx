import { makeForgotPasswordValidation } from './forgot-password-validation-factory'
import { makeForgotYourPassword } from 'src/main/factories/usecases'
import { ForgotPassword } from 'src/presentation/pages/login/components'

import React from 'react'

const MakeForgotPassword: React.FC = () => {
  return (
    <ForgotPassword
      validation={makeForgotPasswordValidation()}
      forgotYourPassword={makeForgotYourPassword()}
    />)
}

export default MakeForgotPassword
