import { RemoteResetPasswordSpy } from 'src/__tests__/domain/mocks'
import { userInfoResetPasswordState } from 'src/__tests__/main/factories/mock'
import { Helpers } from 'src/__tests__/presentation/mocks'
import { ValidationStub } from 'src/__tests__/presentation/test'
import { UnchangedPasswordError } from 'src/domain/errors'
import { ForgotPasswordPage } from 'src/presentation/pages'

import faker from '@faker-js/faker'
import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import { MutableSnapshot, RecoilRoot } from 'recoil'

type SutParams = {
  validationError?: string
  email?: string
  hash?: string
}

type SutType = {
  resetPasswordSpy: RemoteResetPasswordSpy
}
const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (params: SutParams = {
  email: faker.internet.email(), hash: faker.datatype.uuid(), validationError: undefined
}): SutType => {
  const getUserInfoResetPasswordMock = jest.fn().mockResolvedValueOnce(Promise.resolve({ email: params.email, hash: params.hash }))
  const validationStub = new ValidationStub()
  const resetPasswordSpy = new RemoteResetPasswordSpy()
  validationStub.errorMessage = params?.validationError
  render(
    <RecoilRoot initializeState={({ set }: MutableSnapshot) => {
      set(userInfoResetPasswordState, {
        setUserInfoResetPassword: jest.fn(),
        getUserInfoResetPassword: getUserInfoResetPasswordMock
      })
    }}
    >
      <IonReactRouter>
        <Router history={history}>
          <IonRouterOutlet>
            <ForgotPasswordPage validation={validationStub} resetPassword={resetPasswordSpy} />
          </IonRouterOutlet>
        </Router>
      </IonReactRouter>
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

  test('Should disable submit button if form is invalid', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helpers.populateField('forgotPassword')
    Helpers.testStatusForField('forgotPasswordConfirmation', validationError)

    expect(screen.getByTestId('submit')).toBeDisabled()
  })

  test('Should show spinner on submit button click', async () => {
    makeSut()

    const form = screen.getByTestId('forgot-form')
    fireEvent.submit(form)

    await waitFor(() => expect(screen.getByTestId('spinner')).toBeInTheDocument())
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

  test('Should hide mainInfo if closeInfo click', async () => {
    const { resetPasswordSpy } = makeSut()
    resetPasswordSpy.response = false

    await simulateValidSubmit()
    fireEvent.click(screen.getByTestId('close-info'))

    expect(screen.getByTestId('error-wrap').children.length).toBe(0)
  })

  test('Should present UnchangedPasswordError if reset password fails', async () => {
    const { resetPasswordSpy } = makeSut()
    const error = new UnchangedPasswordError()
    jest.spyOn(resetPasswordSpy, 'reset').mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit()

    expect(screen.getByTestId('main-info')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should hide spinner and show mainInfo with success if ResetPassword return true', async () => {
    const { resetPasswordSpy } = makeSut()
    resetPasswordSpy.response = true

    await simulateValidSubmit()

    expect(screen.getByTestId('main-info')).toHaveTextContent('Senha alterada com sucesso!')
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
    expect(screen.getByTestId('forgotPassword')).toHaveAttribute('value', '')
    expect(screen.getByTestId('forgotPasswordConfirmation')).toHaveAttribute('value', '')
  })

  test('Should throw UnchangedPasswordError if ResetPassword returns false', async () => {
    const { resetPasswordSpy } = makeSut()
    resetPasswordSpy.response = false

    await simulateValidSubmit()

    expect(screen.getByTestId('main-info')).toHaveTextContent(new UnchangedPasswordError().message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should go to login page', () => {
    makeSut()

    fireEvent.click(screen.getByTestId('to-login'))

    expect(history.index).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
