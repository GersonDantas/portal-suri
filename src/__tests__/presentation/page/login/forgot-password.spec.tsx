import { AuthenticationSpy } from 'src/__tests__/domain/mocks'
import { mockForgotPasswordResponse } from 'src/__tests__/domain/mocks/mock-forgot-password'
import { ValidationStub } from 'src/__tests__/presentation/test'
import { ForgotPasswordResponse } from 'src/data/models'
import { ForgotYourPassword } from 'src/domain/usecases'
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

type SutTypes = {
  forgotYourPassword: ForgotYourPasswordSpy
}

class ForgotYourPasswordSpy implements ForgotYourPassword {
  email: string
  callsCount = 0

  async sendEmail (email: string): Promise<ForgotPasswordResponse> {
    this.email = email
    this.callsCount++
    return mockForgotPasswordResponse()
  }
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const forgotYourPassword = new ForgotYourPasswordSpy()
  validationStub.errorMessage = params?.validationError
  render(
    <RecoilRoot>
      <Router history={history} >
        <Login validation={new ValidationStub()} authentication={new AuthenticationSpy()} >
          <ForgotPassword validation={validationStub} forgotYourPassword={forgotYourPassword} />
        </Login>
      </Router>
    </RecoilRoot>
  )

  return {
    forgotYourPassword
  }
}

const clickForgotButton = async (): Promise<void> => {
  fireEvent.click(screen.getByTestId('forgot-button'))
  await waitForIonicReact()
}

describe('ForgotPassword', () => {
  test('Should ensure that it will show the ForgotPassword component', async () => {
    makeSut()

    await clickForgotButton()

    expect(screen.getByTestId('form-forgot')).toBeInTheDocument()
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
    fireEvent.input(input, { target: { value: faker.internet.email() } })

    expect(input.title).toBe(validationError)
  })

  test('Should call ForgotYourPassword with correct value', async () => {
    const { forgotYourPassword } = makeSut()

    await clickForgotButton()
    const email = faker.internet.email()
    fireEvent.input(screen.getByTestId('input-forgot'), { target: { value: email } })
    await waitForIonicReact()
    fireEvent.submit(screen.getByTestId('form-forgot'))
    await waitForIonicReact()

    expect(forgotYourPassword.email).toBe(email)
  })

  test('Should call ForgotYourPassword only once', async () => {
    const { forgotYourPassword } = makeSut()

    await clickForgotButton()
    fireEvent.input(screen.getByTestId('input-forgot'), { target: { value: faker.internet.email() } })
    await waitForIonicReact()
    fireEvent.submit(screen.getByTestId('form-forgot'))
    await waitForIonicReact()
    fireEvent.submit(screen.getByTestId('form-forgot'))

    expect(forgotYourPassword.callsCount).toBe(1)
  })

  test('Should not call ForgotYourPassword if form is invalid', async () => {
    const validationError = faker.lorem.words()
    const { forgotYourPassword } = makeSut({ validationError })

    await clickForgotButton()
    fireEvent.input(screen.getByTestId('input-forgot'), { target: { value: faker.lorem.words() } })
    await waitForIonicReact()
    fireEvent.submit(screen.getByTestId('form-forgot'))
    await waitForIonicReact()

    expect(forgotYourPassword.callsCount).toBe(0)
  })
})
