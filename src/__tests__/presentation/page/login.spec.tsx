/* eslint-disable jest/valid-title */
import { Login } from 'src/presentation/pages'
import { Validation } from 'src/presentation/protocols'

import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

type SutTypes = {
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage!: string
  input!: object

  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
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

  test('Should call Validation with correct values', () => {
    const { validationSpy } = makeSut()
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.input).toEqual({
      email: 'any_email'
    })
  })
})
