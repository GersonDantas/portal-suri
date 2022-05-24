import { AuthenticationSpy } from 'src/__tests__/domain/mocks'
import { ValidationStub } from 'src/__tests__/presentation/test'
import { Login } from 'src/presentation/pages'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (): void => {
  render(
    <RecoilRoot>
      <Router history={history} >
        <Login validation={new ValidationStub()} authentication={new AuthenticationSpy()} />
      </Router>
    </RecoilRoot>
  )
}

describe('ForgotPassword', () => {
  test('Should ensure that it will show the ForgotPassword component', async () => {
    makeSut()

    const forgotPassword = screen.getByTestId('forgot-button')
    fireEvent.click(forgotPassword)
    await waitFor(() => screen.findByTestId('forgot-wrap'))

    expect(screen.getByTestId('forgot-wrap')).toBeInTheDocument()
  })
})
