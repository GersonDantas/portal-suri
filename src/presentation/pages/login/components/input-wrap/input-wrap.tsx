import Styles from './input-wrap.module.scss'

import { InputBase } from 'src/presentation/components'

import React from 'react'

type Props = {
  label: string
  className: string
}

const InputWrap: React.FC<Props> = ({ label, className }) => {
  const capitalize = label[0].toUpperCase() + label.substring(1)
  return (
    <div className={Styles.inputWrap}>
      <label htmlFor={`${label}-input`} >{capitalize}</label>
      <InputBase type={label} id={`${label}-input`} className={className} />
    </div>
  )
}

export default InputWrap
