import { loginState } from '../atom'
import Styles from './input-wrap.module.scss'

import React from 'react'
import { useRecoilValue } from 'recoil'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const InputWrap: React.FC<Props> = ({ name, ...props }) => {
  const state = useRecoilValue<any>(loginState)
  const error = state[`${name}Error`]
  const capitalize = name && name[0].toUpperCase() + name.substring(1)
  return (
    <div data-status='invalid' data-testid={`${name}-status`} className={Styles.inputWrap}>
      <label htmlFor={`${name}-input`} >{capitalize}</label>
      <input {...props} data-testid={name} title={error} id={`${name}-input`} />
    </div>
  )
}

export default InputWrap
