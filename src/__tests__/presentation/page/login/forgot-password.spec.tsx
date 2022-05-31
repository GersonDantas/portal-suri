import { AuthenticationSpy } from 'src/__tests__/domain/mocks'
import { mockForgotPasswordResponse } from 'src/__tests__/domain/mocks/mock-forgot-password'
import { ValidationStub } from 'src/__tests__/presentation/test'
import { ForgotPasswordResponse } from 'src/data/models'
import { IsFacebookError, UnexpectedError, UserNotFoundError } from 'src/domain/errors'
import { ForgotYourPassword } from 'src/domain/usecases'
import { Login } from 'src/presentation/pages'
import { ForgotPassword } from 'src/presentation/pages/login/components'

import faker from '@faker-js/faker'
import { waitForIonicReact, ionFireEvent } from '@ionic/react-test-utils'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

const history = createMemoryHistory({ initialEntries: ['/login'] })

type SutParams = {
  validationError: string
}

type SutTypes = {
  forgotYourPasswordSpy: ForgotYourPasswordSpy
}

class ForgotYourPasswordSpy implements ForgotYourPassword {
  email: string
  callsCount = 0

  async sendEmail (email: string): Promise<ForgotPasswordResponse> {
    this.email = email
    this.callsCount++
    return Promise.resolve(mockForgotPasswordResponse())
  }
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const forgotYourPasswordSpy = new ForgotYourPasswordSpy()
  validationStub.errorMessage = params?.validationError
  render(
    <RecoilRoot>
      <Router history={history} >
        <Login validation={new ValidationStub()} authentication={new AuthenticationSpy()} >
          <ForgotPassword validation={validationStub} forgotYourPassword={forgotYourPasswordSpy} />
        </Login>
      </Router>
    </RecoilRoot>
  )

  return {
    forgotYourPasswordSpy
  }
}

const clickForgotButton = async (): Promise<void> => {
  ionFireEvent.click(screen.getByTestId('forgot-button'))
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

  test('Should ensure close modal if empty input and submit button click ', async () => {
    makeSut()

    await clickForgotButton()
    fireEvent.click(screen.getByTestId('forgot-submit'))

    await waitFor(() => expect(screen.queryByText('Qual o e-mail do cadastro?')).toBeFalsy())
  })

  test('Should show email error in title if validations fails', async () => {
    const validationError = faker.lorem.words()
    makeSut({ validationError })

    await clickForgotButton()
    const input = screen.getByTestId('input-forgot')
    fireEvent.input(input, { target: { value: faker.internet.email() } })

    expect(input.title).toBe(validationError)
  })

  test('Should call ForgotYourPassword with correct value', async () => {
    const { forgotYourPasswordSpy } = makeSut()

    await clickForgotButton()
    const email = faker.internet.email()
    fireEvent.input(screen.getByTestId('input-forgot'), { target: { value: email } })
    fireEvent.submit(screen.getByTestId('form-forgot'))

    await waitFor(() => expect(forgotYourPasswordSpy.email).toBe(email))
  })

  test('Should call ForgotYourPassword only once', async () => {
    const { forgotYourPasswordSpy } = makeSut()

    await clickForgotButton()
    fireEvent.input(screen.getByTestId('input-forgot'), { target: { value: faker.internet.email() } })
    const form = screen.getByTestId('form-forgot')
    fireEvent.submit(form)
    fireEvent.submit(form)

    await waitFor(() => expect(forgotYourPasswordSpy.callsCount).toBe(1))
  })

  test('Should not call ForgotYourPassword if form is invalid', async () => {
    const validationError = faker.lorem.words()
    const { forgotYourPasswordSpy } = makeSut({ validationError })

    await clickForgotButton()
    fireEvent.input(screen.getByTestId('input-forgot'), { target: { value: faker.lorem.words() } })
    fireEvent.submit(screen.getByTestId('form-forgot'))

    expect(forgotYourPasswordSpy.callsCount).toBe(0)
  })

  test('Should ensure show FormStatus with IsFacebookError or UserNotFoundError if returns Error', async () => {
    const { forgotYourPasswordSpy } = makeSut()
    const error = faker.random.arrayElement([new IsFacebookError(), new UserNotFoundError()])

    await clickForgotButton()
    fireEvent.input(screen.getByTestId('input-forgot'), { target: { value: faker.internet.email() } })
    jest
      .spyOn(forgotYourPasswordSpy, 'sendEmail')
      .mockRejectedValueOnce(error)
    const form = screen.getByTestId('form-forgot')
    fireEvent.submit(form)
    await waitFor(() => form)

    expect(screen.getByTestId('main-info')).toHaveClass('isError')
    expect(screen.getByTestId('main-info')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should ensure show FormStatus with error message UnexpectedError if returns body empty', async () => {
    const { forgotYourPasswordSpy } = makeSut()
    const value = faker.random.arrayElement([undefined, null])

    await clickForgotButton()
    jest
      .spyOn(forgotYourPasswordSpy, 'sendEmail')
      .mockReturnValueOnce(value)
    fireEvent.input(screen.getByTestId('input-forgot'), { target: { value: faker.internet.email() } })
    const form = screen.getByTestId('form-forgot')
    fireEvent.submit(form)
    await waitFor(() => form)

    expect(screen.getByTestId('main-info')).toHaveTextContent(new UnexpectedError().message)
  })

  test('Should ensure show FormStatus with email success message if returns ResetLinkSent', async () => {
    const { forgotYourPasswordSpy } = makeSut()

    await clickForgotButton()
    jest
      .spyOn(forgotYourPasswordSpy, 'sendEmail')
      .mockReturnValueOnce(Promise.resolve({ success: true, type: 2 }))
    fireEvent.input(screen.getByTestId('input-forgot'), { target: { value: faker.internet.email() } })
    const form = screen.getByTestId('form-forgot')
    fireEvent.submit(form)
    await waitFor(() => form)

    expect(screen.getByTestId('main-info')).toHaveClass('isInfo')
    expect(screen.getByTestId('main-info')).toHaveTextContent('Um e-mail foi enviado para o endereço de e-mail informado')
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })
})
