import { AuthenticationSpy, mockCbmAuth } from 'src/__tests__/domain/mocks'
import { Helpers } from 'src/__tests__/presentation/mocks'
import { ValidationStub } from 'src/__tests__/presentation/test'
import { InvalidCredentialsError } from 'src/domain/errors'
import { CbmAuth } from 'src/domain/models'
import { createTokenSuri } from 'src/main/factories/cache'
import { currentCbmAuthState } from 'src/presentation/components'
import { Login } from 'src/presentation/pages'

import faker from '@faker-js/faker'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React, { ReactElement } from 'react'
import 'jest-localstorage-mock'
import { Router } from 'react-router-dom'
import { MutableSnapshot, RecoilRoot } from 'recoil'

interface SutTypes {
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  setCurrentCbmAuthMock: (cbmAuth: CbmAuth) => Promise<void>
}

interface SutParams {
  validationError?: string
  childrenMock?: ReactElement
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const setCurrentCbmAuthMock = jest.fn().mockResolvedValue(Promise.resolve())
  const getCurrentCbmAuthMock = jest.fn().mockReturnValue(Promise.resolve(mockCbmAuth()))
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const initializeState = ({ set }: MutableSnapshot): void => {
    set(currentCbmAuthState, {
      setCurrentCbmAuth: setCurrentCbmAuthMock,
      getCurrentCbmAuth: getCurrentCbmAuthMock
    })
  }
  render(
    <RecoilRoot initializeState={initializeState}>
      <Router history={history} >
        <Login validation={validationStub} authentication={authenticationSpy} >
          {params?.childrenMock}
        </Login>
      </Router>
    </RecoilRoot>
  )

  return {
    validationStub,
    authenticationSpy,
    setCurrentCbmAuthMock
  }
}

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helpers.populateField('email', email)
  Helpers.populateField('password', password)
  const form = screen.getByTestId('login-form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const anyText = faker.datatype.uuid()
    const childrenMock = <p>{anyText}</p>

    makeSut({ validationError, childrenMock })

    expect(screen.queryByText(new RegExp(anyText, 'i'))).toBeInTheDocument()
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    Helpers.testStatusForField('email', validationError)
    Helpers.testStatusForField('password', validationError)
  })

  test('Should show email error if Validations fails', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    Helpers.testStatusForField('email', validationError)
  })

  test('Should show password error if Validations fails', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    Helpers.testStatusForField('password', validationError)
  })

  test('Should show valid email state if Validations success', () => {
    makeSut()

    Helpers.testStatusForField('email')
  })

  test('Should show valid password state if Validations success', () => {
    makeSut()

    Helpers.testStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    Helpers.populateField('email')
    Helpers.populateField('password')

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
    Helpers.populateField('email')

    fireEvent.submit(screen.getByTestId('login-form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit()

    expect(screen.getByTestId('main-info')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should close mainInfo if click closeInfo', async () => {
    const { authenticationSpy } = makeSut()
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(new InvalidCredentialsError()))

    await simulateValidSubmit()
    fireEvent.click(screen.getByTestId('close-info'))

    expect(screen.getByTestId('error-wrap').children.length).toBe(0)
  })

  test('Should ensure that Authentication will save the return in localstorage on success', async () => {
    const { authenticationSpy, setCurrentCbmAuthMock } = makeSut()

    await simulateValidSubmit()
    const form = screen.getByTestId('login-form')
    await waitFor(() => form)

    const tokenSession = authenticationSpy.session.tokenSession
    const userId = authenticationSpy.session.platformUser.id

    expect(setCurrentCbmAuthMock).toHaveBeenCalledWith(createTokenSuri({ tokenSession, userId }))
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
})
