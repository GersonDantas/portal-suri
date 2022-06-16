import { Helpers } from 'src/__tests__/presentation/mocks'
import { ValidationStub } from 'src/__tests__/presentation/test'
import { ForgotPasswordPage } from 'src/presentation/pages'

import faker from '@faker-js/faker'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

type SutParams = {
  validationError?: string
}

const makeSut = (params?: SutParams): void => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  render(
    <RecoilRoot>
      <ForgotPasswordPage validation={validationStub} />
    </RecoilRoot>
  )
}

describe('ForgotPasswordPage', () => {
  test('Should ensure render to initial state', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit-forgot')).toBeDisabled()
    Helpers.testStatusForField('forgotPassword', validationError)
    Helpers.testStatusForField('forgotPasswordConfirmation', validationError)
  })

  test('Should show forgotPassword error if Validation fails', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    Helpers.populateField('forgotPassword')
    Helpers.testStatusForField('forgotPassword', validationError)
  })

  test('Should show forgotPasswordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    Helpers.populateField('forgotPasswordConfirmation')
    Helpers.testStatusForField('forgotPasswordConfirmation', validationError)
  })

  test('Should show valid forgotPassword state if Validation success', () => {
    makeSut()

    Helpers.populateField('forgotPassword')
    Helpers.testStatusForField('forgotPassword')
  })

  test('Should show valid forgotPasswordConfirmation state if Validation success', () => {
    makeSut()

    Helpers.populateField('forgotPasswordConfirmation')
    Helpers.testStatusForField('forgotPasswordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    Helpers.populateField('forgotPassword')
    Helpers.populateField('forgotPasswordConfirmation')

    expect(screen.getByTestId('submit-forgot')).not.toBeDisabled()
  })
})
