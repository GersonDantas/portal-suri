import Styles from './input-wrap.module.scss'

import React from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  state: any
  setState: any
}

const InputWrap: React.FC<Props> = ({ state, setState, ...props }) => {
  const error = state[`${props.name}Error`]
  const capitalize = props.name && props.name[0].toUpperCase() + props.name.substring(1)
  return (
    <div data-testid={`${props.name}-status`} className={Styles.inputWrap}>
      <label htmlFor={`${props.name}-input`} >{capitalize}</label>
      <input
        {...props}
        data-testid={props.name}
        title={error}
        id={`${props.name}-input`}
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
      />
    </div>
  )
}

export default InputWrap
