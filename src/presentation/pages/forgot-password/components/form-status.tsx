import { FormStatusBase } from 'src/presentation/components'
import { forgotPasswordPageState } from 'src/presentation/pages/forgot-password/components'

import React from 'react'
import { useRecoilState } from 'recoil'

const FormStatus: React.FC = () => {
  const [state, setState] = useRecoilState(forgotPasswordPageState)
  return (
    <FormStatusBase state={state} closeInfo={() => setState(old => ({ ...old, mainInfo: '' }))} />
  )
}

export default FormStatus
