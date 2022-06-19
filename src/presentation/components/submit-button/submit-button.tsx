import { Button } from 'src/presentation/components'

import React from 'react'

type Props = {
  text: string
  state: any
  dataTestId?: string
}

const SubmitButton: React.FC<Props> = ({ text, state, dataTestId }) => {
  return (
    <Button disabled={state.isFormInvalid} data-testid={dataTestId ?? 'submit'} type='submit'>
      {text}
    </Button>
  )
}

export default SubmitButton
