import { validationLinkState } from './atom'

import React from 'react'
import { useRecoilValue } from 'recoil'

const ValidationLinkProxy: React.FC = () => {
  const state = useRecoilValue(validationLinkState)

  return state.success
    ? <div>ResetPasswordPage</div>
    : <div>{state.mainError}</div>
}

export default ValidationLinkProxy
