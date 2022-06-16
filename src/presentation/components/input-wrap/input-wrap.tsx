import Styles from './input-wrap.module.scss'
import { InputBase } from 'src/presentation/components'

import React from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  state: any
  setState: any
}

const capitalizeText = (text: string): string => text[0].toUpperCase() + text.substring(1)

const InputWrap: React.FC<Props> = ({ state, setState, ...props }) => {
  const error = state[`${props.name}Error`]
  const capitalize = props['aria-label']
    ? capitalizeText(props['aria-label'])
    : capitalizeText(props.name)
  return (
    <div data-testid={`${props.name}-wrap`} className={Styles.inputWrap}>
      <label htmlFor={`${props.name}-input`} >{capitalize}</label>
      <InputBase
        {...props}
        data-status={error ? 'invalid' : 'valid'}
        data-testid={props.name}
        title={error || 'ok'}
        id={`${props.name}-input`}
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
      />
    </div>
  )
}

export default InputWrap
