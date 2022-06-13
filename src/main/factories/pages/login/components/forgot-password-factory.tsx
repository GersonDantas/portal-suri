import { makeForgotPasswordValidation } from './forgot-password-validation-factory'
import { makeForgotYourPassword } from 'src/main/factories/usecases'
import { ForgotPasswordModal } from 'src/presentation/pages/login/components'

import React from 'react'

const MakeForgotPassword: React.FC = () => {
  return (
    <ForgotPasswordModal
      validation={makeForgotPasswordValidation()}
      forgotYourPassword={makeForgotYourPassword()}
    />)
}

export default MakeForgotPassword
