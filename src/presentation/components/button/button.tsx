import Styles from './button.module.scss'

import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
}

const Button: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <button {...props} className={[Styles.buttonWrap, className].join(' ')}>
      {children}
    </button>
  )
}

export default Button
