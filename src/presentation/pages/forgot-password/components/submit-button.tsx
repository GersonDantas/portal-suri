import { forgotPasswordPageState } from './atoms'
import { SubmitButtonBase } from 'src/presentation/components'

import React from 'react'
import { useRecoilValue } from 'recoil'

type Props = {
  text: string
}

const Button: React.FC<Props> = ({ text }: Props) => {
  const state = useRecoilValue(forgotPasswordPageState)
  return (
    <SubmitButtonBase text={text} state={state} />
  )
}

export default Button
