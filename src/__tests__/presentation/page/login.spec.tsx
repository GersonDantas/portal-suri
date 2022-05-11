/* eslint-disable jest/valid-title */
import { ValidationSpy } from 'src/__tests__/presentation/test'
import { Login } from 'src/presentation/pages'

import faker from '@faker-js/faker'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

type SutTypes = {
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = faker.random.words()
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
    const { validationSpy } = makeSut()
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('email')).toHaveProperty('title', validationSpy.errorMessage)
    expect(screen.getByTestId('password')).toHaveProperty('title', 'Campo obrigatório')
  })

  test('Should call Validation with correct email', () => {
    const { validationSpy } = makeSut()
    const emailInput = screen.getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('Should call Validation with correct password', () => {
    const { validationSpy } = makeSut()
    const passwordInput = screen.getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('Should show email error if Validations fails', () => {
    const { validationSpy } = makeSut()
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    expect(emailInput.title).toBe(validationSpy.errorMessage)
  })
})
