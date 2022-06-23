import { InputBase } from 'src/presentation/components'
import { modalState } from 'src/presentation/pages/login/components'

import React, { ChangeEvent, useState } from 'react'
import { useRecoilState } from 'recoil'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props) => {
  const [state, setState] = useRecoilState(modalState)
  const [invalid, setInvalid] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState(old => ({ ...old, [e.target.name]: e.target.value }))
    setInvalid('invalid')
  }

  return (
    <InputBase
      {...props}
      data-status={state.forgotEmailError ? invalid : 'valid'}
      data-testid='input-email-forgot'
      title={state.forgotEmailError}
      id='input-modal'
      onChange={onChange}
    />
  )
}

export default Input
