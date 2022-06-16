import { SubmitButtonBase } from 'src/presentation/components'
import { modalState } from 'src/presentation/pages/login/components'

import React from 'react'
import { useRecoilValue } from 'recoil'

type Props = {
  text: string
}

const Button: React.FC<Props> = ({ text }: Props) => {
  const state = useRecoilValue(modalState)
  return (
    <SubmitButtonBase dataTestId='forgot-submit' text={text} state={state} />
  )
}

export default Button
