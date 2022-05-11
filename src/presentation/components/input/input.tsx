import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<Props> = ({ ...props }) => {
  return (
    <input {...props} />
  )
}

export default Input
