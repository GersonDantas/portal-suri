import Styles from './input.module.scss'

import React from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props) => {
  return (
    <input
      {...props}
      className={[Styles.input, props.className].join(' ')}
    />
  )
}

export default Input
