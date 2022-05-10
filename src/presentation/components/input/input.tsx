import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<Props> = ({ className, ...props }) => {
  return (
    <input {...props} className={className} />
  )
}

export default Input
