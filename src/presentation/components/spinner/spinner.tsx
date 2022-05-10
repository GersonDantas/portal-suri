import Styles from './spinner.module.scss'

import React from 'react'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC<Props> = (props) => {
  return (
    <div {...props} className={[Styles.spinner, props.className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Spinner
