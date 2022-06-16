import { ValidationStub } from '../../test'
import { ForgotPasswordPage } from 'src/presentation/pages'

import faker from '@faker-js/faker'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

describe('ForgotPasswordPage', () => {
  test('Should ensure render to initial state', () => {
    const validationError = faker.random.words()
    const validationStub = new ValidationStub()
    validationStub.errorMessage = validationError
    render(
      <RecoilRoot>
        <ForgotPasswordPage validation={validationStub} />
      </RecoilRoot>
    )

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit-forgot')).toBeDisabled()
    expect(screen.getByTestId('forgotPassword')).toHaveProperty('title', validationError)
    expect(screen.getByTestId('forgotPasswordConfirmation')).toHaveProperty('title', validationError)
  })
})
