/* eslint-disable jest/valid-title */
import { ValidationStub } from 'src/__tests__/presentation/test'
import { Login } from 'src/presentation/pages'

import faker from '@faker-js/faker'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

type SutTypes = {
  validationSpy: ValidationStub
}

type SutParams = {
  validationError: string
}

const makeSut = (params: SutParams = { validationError: '' }): SutTypes => {
  const validationSpy = new ValidationStub()
  validationSpy.errorMessage = params.validationError
  render(
    <RecoilRoot>
      <Login validation={validationSpy} />
    </RecoilRoot>
  )

  return {
    validationSpy
  }
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
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    expect(emailInput.title).toBe(validationError)
  })

  test('Should show password error if Validations fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    expect(passwordInput.title).toBe(validationError)
  })

  test('Should show valid email state if Validations success', () => {
    makeSut()
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    expect(emailInput.title).toBe('ok')
  })

  test('Should show valid password state if Validations success', () => {
    makeSut()
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    expect(passwordInput.title).toBe('ok')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    expect(screen.getByTestId('submit')).not.toBeDisabled()
  })
})
