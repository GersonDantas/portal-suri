import { makeRemoteResetPassword } from '../../usecases'
import { makeForgotPasswordPageValidation } from './forgot-password-page-validation-factory'
import { ForgotPasswordPage } from 'src/presentation/pages'

import React from 'react'

const MakeForgotPasswordPage: React.FC = () => {
  return <ForgotPasswordPage validation={makeForgotPasswordPageValidation()} resetPassword={makeRemoteResetPassword()} />
}

export default MakeForgotPasswordPage
