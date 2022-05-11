/* eslint-disable jest/valid-title */
import { Login } from 'src/presentation/pages'

import { render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

const makeSut = (): void => {
  render(
    <RecoilRoot>
      <Login />
    </RecoilRoot>
  )
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    makeSut()
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
  })
})
