/* eslint-disable jest/valid-title */
import { ValidationSpy } from 'src/__tests__/presentation/test'
import { Login } from 'src/presentation/pages'

import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

type SutTypes = {
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
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
    makeSut()
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('email-status')).toHaveAttribute('data-status', 'invalid')
    expect(screen.getByTestId('email')).toHaveProperty('title', 'Campo obrigatório')
    expect(screen.getByTestId('password-status')).toHaveAttribute('data-status', 'invalid')
    expect(screen.getByTestId('password')).toHaveProperty('title', 'Campo obrigatório')
  })

  test('Should call Validation with correct email', () => {
    const { validationSpy } = makeSut()
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe('any_email')
  })

  test('Should call Validation with correct password', () => {
    const { validationSpy } = makeSut()
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe('any_password')
  })
})
