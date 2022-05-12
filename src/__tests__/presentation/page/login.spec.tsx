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
    expect(screen.getByTestId('password')).toHaveProperty('title', validationSpy.errorMessage)
  })

  test('Should show email error if Validations fails', () => {
    const { validationSpy } = makeSut()
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    expect(emailInput.title).toBe(validationSpy.errorMessage)
  })

  test('Should show password error if Validations fails', () => {
    const { validationSpy } = makeSut()
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    expect(passwordInput.title).toBe(validationSpy.errorMessage)
  })

  test('Should show valid email state if Validations success', () => {
    const { validationSpy } = makeSut()
    validationSpy.errorMessage = ''
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    expect(emailInput.title).toBe('ok')
  })

  test('Should show valid password state if Validations success', () => {
    const { validationSpy } = makeSut()
    validationSpy.errorMessage = ''
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    expect(passwordInput.title).toBe('ok')
  })
})
