import { loginState } from './atoms'
import { InputWrapBase } from 'src/presentation/components'

import React from 'react'
import { useRecoilState } from 'recoil'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const InputWrap: React.FC<Props> = (props) => {
  const [state, setState] = useRecoilState(loginState)
  return (
    <InputWrapBase {...props} state={state} setState={setState} />
  )
}

export default InputWrap
