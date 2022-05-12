import { AuthenticationSpy } from 'src/__tests__/domain/mocks'
import { ValidationStub } from 'src/__tests__/presentation/test'
import { Login } from 'src/presentation/pages'

import faker from '@faker-js/faker'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

type SutTypes = {
  validationSpy: ValidationStub
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationStub()
  validationSpy.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  render(
    <RecoilRoot>
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </RecoilRoot>
  )

  return {
    validationSpy,
    authenticationSpy
  }
}

const populateField = (fieldName: string, value: string = faker.internet.email()): HTMLElement => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })

  return input
}

const simulateValidSubmit = (email = faker.internet.email(), password = faker.internet.password()): void => {
  populateField('email', email)
  populateField('password', password)
  const submitButton = screen.getByTestId('submit')
  fireEvent.click(submitButton)
}

const simulateStatusForField = (fieldName: string, validationError?: string): void => {
  const input = populateField(fieldName)
  expect(input.title).toBe(validationError || 'ok')
}

describe('Login Component', () => {
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

  test('Should show spinner on submit click', () => {
    makeSut()
    simulateValidSubmit()
    expect(screen.getByTestId('spinner')).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', () => {
    const { authenticationSpy } = makeSut()
    simulateValidSubmit()
    simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    populateField('email')
    fireEvent.submit(screen.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })
})
