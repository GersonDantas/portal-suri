/* eslint-disable jest/valid-title */
import { Login } from 'src/presentation/pages'

import { render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

describe('Login Component', () => {
  test('Should ensure FormStatus no initial state', () => {
    render(
      <RecoilRoot>
        <Login />
      </RecoilRoot>
    )
    const errorWrap = screen.getByTestId('error-wrap')
    expect(errorWrap.children).toHaveLength(0)
  })
})
