import { FormStatusBase } from 'src/presentation/components'
import { forgotPasswordPageState } from 'src/presentation/pages/forgot-password/components'

import React from 'react'
import { useHistory } from 'react-router'
import { useRecoilState } from 'recoil'

const FormStatus: React.FC = () => {
  const history = useHistory()
  const [state, setState] = useRecoilState(forgotPasswordPageState)
  const closeInfo = (): void => {
    setState(old => ({ ...old, mainInfo: '' }))
    history.replace('/login')
  }
  return (
    <FormStatusBase state={state} closeInfo={closeInfo} />
  )
}

export default FormStatus
