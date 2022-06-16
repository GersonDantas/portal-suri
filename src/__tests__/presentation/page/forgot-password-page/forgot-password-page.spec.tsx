import { ForgotPasswordPage } from 'src/presentation/pages'

import { render } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

describe('ForgotPasswordPage', () => {
  test('Should ensure render to initial state', () => {
    render(
      <RecoilRoot>

        <ForgotPasswordPage />
      </RecoilRoot>
    )
  })
})
