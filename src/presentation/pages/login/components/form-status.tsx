import { loginState } from './atoms'
import { FormStatusBase } from 'src/presentation/components'

import React from 'react'
import { useRecoilState } from 'recoil'

const FormStatus: React.FC = () => {
  const [state, setState] = useRecoilState(loginState)
  return (
    <FormStatusBase closeInfo={() => setState(old => ({ ...old, mainInfo: '' }))} state={state} />
  )
}

export default FormStatus
