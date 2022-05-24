import { AuthenticationSpy } from 'src/__tests__/domain/mocks'
import { ValidationStub } from 'src/__tests__/presentation/test'
import { InvalidCredentialsError } from 'src/domain/errors/http'
import { createTokenSuri } from 'src/main/factories/cache'
import { Login } from 'src/presentation/pages'


import faker from '@faker-js/faker'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import 'jest-localstorage-mock'
import { Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

type SutTypes = {
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  render(
    <RecoilRoot>
      <Router history={history} >
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </RecoilRoot>
  )

  return {
    validationStub,
    authenticationSpy
  }
}

const populateField = (fieldName: string, value = faker.internet.email()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateField('email', email)
  populateField('password', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const simulateStatusForField = (fieldName: string, validationError?: string): void => {
  populateField(fieldName)
  const input = screen.getByTestId(fieldName)
  expect(input.title).toBe(validationError || 'ok')
}

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test('Should start with initial state', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('email')).toHaveProperty('title', validationError)
    expect(screen.getByTestId('password')).toHaveProperty('title', validationError)
  })

  test('Should show email error if Validations fails', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    simulateStatusForField('email', validationError)
  })

  test('Should show password error if Validations fails', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    simulateStatusForField('password', validationError)
  })

  test('Should show valid email state if Validations success', () => {
    makeSut()

    simulateStatusForField('email')
  })

  test('Should show valid password state if Validations success', () => {
    makeSut()

    simulateStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    populateField('email')
    populateField('password')

    expect(screen.getByTestId('submit')).not.toBeDisabled()
  })

  test('Should show spinner on submit click', async () => {
    makeSut()

    await simulateValidSubmit()

    expect(screen.getByTestId('spinner')).toBeTruthy()
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    populateField('email')

    fireEvent.submit(screen.getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit()

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should ensure that Authentication will save the return in localstorage on success', async () => {
    const { authenticationSpy } = makeSut()

    await simulateValidSubmit()
    const form = screen.getByTestId('form')
    await waitFor(() => form)

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', createTokenSuri(
      authenticationSpy.session.tokenSession,
      authenticationSpy.session.platformUser.id
    ))
    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signUp page', () => {
    makeSut()

    const signup = screen.getByTestId('signup')
    fireEvent.click(signup)

    expect(history.index).toBe(1)
    expect(history.location.pathname).toBe('/signup')
  })

  test('Should ensure that it will show the ForgotPassword component', async () => {
    makeSut()

    const forgotPassword = screen.getByTestId('forgot-button')
    fireEvent.click(forgotPassword)
    await screen.findByTestId('forgot-wrap')

    expect(screen.getByTestId('forgot-wrap')).toBeInTheDocument()
  })
})
