import { UnexpectedError } from 'src/domain/errors'
import { ErrorPage } from 'src/presentation/pages'

import { render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

describe('ErrorPage', () => {
  test('Should ensure ErrorPage render to correct error', async () => {
    const error = new UnexpectedError()
    render(
      <RecoilRoot>
        <ErrorPage errorMessage={error.message} />
      </RecoilRoot>
    )

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })
})
