import { ForgotPasswordPage } from 'src/presentation/pages'

import { render } from '@testing-library/react'
import React from 'react'

describe('ForgotPasswordPage', () => {
  test('Should ensure render to initial state', () => {
    render(
      <ForgotPasswordPage />
    )
  })
})
