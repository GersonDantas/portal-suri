import { AuthenticationSpy } from 'src/__tests__/domain/mocks'
import { ValidationStub } from 'src/__tests__/presentation/test'
import { Login } from 'src/presentation/pages'

import { waitForIonicReact } from '@ionic/react-test-utils'
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

    fireEvent.click(screen.getByTestId('forgot-button'))
    await waitForIonicReact()

    expect(screen.getByTestId('forgot-wrap')).toBeInTheDocument()
  })

  test('Should ensure that it hide the ForgotPassword component to a click cancel button', async () => {
    makeSut()

    fireEvent.click(screen.getByTestId('forgot-button'))
    await waitForIonicReact()
    fireEvent.click(screen.getByTestId('forgot-cancel'))
    await waitForIonicReact()

    expect(screen.queryByText('Qual o e-mail do cadastro?')).toBeFalsy()
  })
})
