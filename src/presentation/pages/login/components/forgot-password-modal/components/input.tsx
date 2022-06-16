import { InputBase } from 'src/presentation/components'
import { modalState } from 'src/presentation/pages/login/components'

import React from 'react'
import { useRecoilState } from 'recoil'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props) => {
  const [state, setState] = useRecoilState(modalState)
  return (
    <InputBase
      {...props}
      data-testid='input-email-forgot'
      title={state.forgotError || 'ok'}
      id='input-modal'
      onChange={e => setState(old => ({ ...old, [e.target.name]: e.target.value }))}
    />
  )
}

export default Input
