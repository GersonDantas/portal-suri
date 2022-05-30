import { loginState } from './atom'
import { FormStatusBase } from 'src/presentation/components'

import React from 'react'
import { useRecoilState } from 'recoil'

const FormStatus: React.FC = () => {
  const [state, setState] = useRecoilState(loginState)
  return (
    <FormStatusBase close={() => setState(old => ({ ...old, mainInfo: '' }))} state={state} />
  )
}

export default FormStatus
