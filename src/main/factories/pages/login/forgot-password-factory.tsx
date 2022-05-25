import { makeForgotPasswordValidation } from './forgot-password-validation-factory'
import { ForgotPassword } from 'src/presentation/pages/login/components'

import React from 'react'

const MakeForgotPassword: React.FC = () => {
  return <ForgotPassword validation={makeForgotPasswordValidation()} />
}

export default MakeForgotPassword
