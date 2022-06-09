import { UnexpectedError } from 'src/domain/errors'
import { ErrorPage } from 'src/presentation/pages'

import { render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

const makeSut = (error: string): void => {
  render(
    <RecoilRoot>
      <ErrorPage errorMessage={error} />
    </RecoilRoot>
  )
}

describe('ErrorPage', () => {
  test('Should ensure ErrorPage render to correct error', async () => {
    const error = new UnexpectedError()
    makeSut(error.message)

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should ensure ErrorPage render to correct error', async () => {
    const error = new UnexpectedError()
    makeSut(error.message)

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })
})
