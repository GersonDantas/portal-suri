import { AuthenticationSpy } from 'src/__tests__/domain/mocks'
import { ValidationStub } from 'src/__tests__/presentation/test'
import { Login } from 'src/presentation/pages'
import { ForgotPassword } from 'src/presentation/pages/login/components'

import faker from '@faker-js/faker'
import { waitForIonicReact } from '@ionic/react-test-utils'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

const history = createMemoryHistory({ initialEntries: ['/login'] })

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): void => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  render(
    <RecoilRoot>
      <Router history={history} >
        <Login validation={new ValidationStub()} authentication={new AuthenticationSpy()} >
          <ForgotPassword validation={validationStub} />
        </Login>
      </Router>
    </RecoilRoot>
  )
}

const clickForgotButton = async (): Promise<void> => {
  fireEvent.click(screen.getByTestId('forgot-button'))
  await waitForIonicReact()
}

describe('ForgotPassword', () => {
  test('Should ensure that it will show the ForgotPassword component', async () => {
    makeSut()

    await clickForgotButton()

    expect(screen.getByTestId('forgot-wrap')).toBeInTheDocument()
  })

  test('Should ensure close modal if click cancel button', async () => {
    makeSut()

    await clickForgotButton()
    fireEvent.click(screen.getByTestId('forgot-cancel'))
    await waitForIonicReact()

    expect(screen.queryByText('Qual o e-mail do cadastro?')).toBeFalsy()
  })

  test('Should ensure close modal if empty input', async () => {
    makeSut()

    await clickForgotButton()
    fireEvent.click(screen.getByTestId('forgot-submit'))

    expect(screen.queryByText('Qual o e-mail do cadastro?')).toBeFalsy()
  })

  test('Should show email error if validations fails', async () => {
    const validationError = faker.lorem.words()
    makeSut({ validationError })

    await clickForgotButton()
    const input = screen.getByTestId('input-forgot')
    fireEvent.input(input, { target: { value: faker.lorem.word() } })

    expect(input.title).toBe(validationError)
  })
})
