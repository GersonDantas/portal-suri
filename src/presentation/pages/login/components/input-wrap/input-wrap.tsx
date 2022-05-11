import Styles from './input-wrap.module.scss'

import React from 'react'

type Props = {
  label: string
  className: string
}

const InputWrap: React.FC<Props> = ({ label, className }) => {
  const capitalize = label[0].toUpperCase() + label.substring(1)
  return (
    <div data-status='invalid' data-testid={`${label}-status`} className={Styles.inputWrap}>
      <label htmlFor={`${label}-input`} >{capitalize}</label>
      <input data-testid={label} title='Campo obrigatório' type={label} id={`${label}-input`} className={className} />
    </div>
  )
}

export default InputWrap
