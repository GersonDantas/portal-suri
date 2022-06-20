import { RemoteResetPasswordSpy } from 'src/__tests__/domain/mocks'
import { Helpers } from 'src/__tests__/presentation/mocks'
import { ValidationStub } from 'src/__tests__/presentation/test'
import { UnchangedPasswordError } from 'src/domain/errors'
import { ForgotPasswordPage } from 'src/presentation/pages'

import faker from '@faker-js/faker'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Route, Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

type SutParams = {
  validationError?: string
  email?: string
  hash?: string
}

type SutType = {
  resetPasswordSpy: RemoteResetPasswordSpy
}

const makeSut = (params: SutParams = {
  email: faker.internet.email(), hash: faker.datatype.uuid(), validationError: undefined
}): SutType => {
  const createHistory = createMemoryHistory({ initialEntries: [`/mudar-senha/${params.email}/${params.hash}`] })
  const validationStub = new ValidationStub()
  const resetPasswordSpy = new RemoteResetPasswordSpy()
  validationStub.errorMessage = params?.validationError
  render(
    <RecoilRoot>
      <Router history={createHistory}>
        <Route path='/mudar-senha/:email/:hash'>
          <ForgotPasswordPage validation={validationStub} resetPassword={resetPasswordSpy} />
        </Route>
      </Router>
    </RecoilRoot>
  )

  return {
    resetPasswordSpy
  }
}

const simulateValidSubmit = async (password = faker.internet.password()): Promise<void> => {
  Helpers.populateField('forgotPassword', password)
  Helpers.populateField('forgotPasswordConfirmation', password)
  const form = screen.getByTestId('forgot-form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('ForgotPasswordPage', () => {
  test('Should ensure render to initial state', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
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

  test('Should enable submit button if form is valid', async () => {
    makeSut()

    Helpers.populateField('forgotPassword')
    Helpers.populateField('forgotPasswordConfirmation')

    await waitFor(() => expect(screen.getByTestId('submit')).not.toBeDisabled())
  })

  test('Should disable submit button if form is invalid', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helpers.populateField('forgotPassword')
    Helpers.testStatusForField('forgotPasswordConfirmation', validationError)

    expect(screen.getByTestId('submit')).toBeDisabled()
  })

  test('Should show spinner on submit button click', async () => {
    makeSut()

    await simulateValidSubmit()

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call RemoteResetPassword with correct values', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const hash = faker.datatype.uuid()
    const { resetPasswordSpy } = makeSut({ email, hash })

    await simulateValidSubmit(password)

    expect(resetPasswordSpy.params).toEqual({
      email,
      password,
      hash
    })
  })

  test('Should call RemoteResetPassword only once', async () => {
    const { resetPasswordSpy } = makeSut()

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(resetPasswordSpy.callsCount).toBe(1)
  })

  test('Should not call RemoteResetPassword if form is invalid', async () => {
    const validationError = faker.random.words()
    const { resetPasswordSpy } = makeSut({ validationError })

    await simulateValidSubmit()

    expect(resetPasswordSpy.callsCount).toBe(0)
  })

  test('Should present UnchangedPasswordError if reset password fails', async () => {
    const { resetPasswordSpy } = makeSut()
    const error = new UnchangedPasswordError()
    jest.spyOn(resetPasswordSpy, 'reset').mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit()

    expect(screen.getByTestId('main-info')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })
})
