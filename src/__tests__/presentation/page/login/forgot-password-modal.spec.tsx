import { AuthenticationSpy, ForgotYourPasswordSpy } from 'src/__tests__/domain/mocks'
import { Helpers } from 'src/__tests__/presentation/mocks'
import { ValidationStub } from 'src/__tests__/presentation/test'
import { IsFacebookError, UnexpectedError, UserNotFoundError } from 'src/domain/errors'
import { ForgotPasswordResponseType } from 'src/domain/models'
import { Login } from 'src/presentation/pages'
import { ForgotPasswordModal } from 'src/presentation/pages/login/components'

import faker from '@faker-js/faker'
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

// jest.mock('@ionic/react', () => ({ ...jest.requireActual<object>('@ionic/react'), useIonViewWillEnter: async (componentCallback: Function) => { await componentCallback() } }))

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const forgotYourPasswordSpy = new ForgotYourPasswordSpy()
  validationStub.errorMessage = params?.validationError
  render(
    <RecoilRoot>
      <Router history={history} >
        <Login validation={new ValidationStub()} authentication={new AuthenticationSpy()} >
          <ForgotPasswordModal validation={validationStub} forgotYourPassword={forgotYourPasswordSpy} />
        </Login>
      </Router>
    </RecoilRoot>
  )

  return {
    forgotYourPasswordSpy
  }
}

const validSubmitForm = async (email = faker.internet.email()): Promise<void> => {
  Helpers.populateField('input-email-forgot', email)
  const form = screen.getByTestId('forgot-form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('ForgotPasswordModal', () => {
  test('Should ensure that it will show the ForgotPasswordModal component', async () => {
    makeSut()

    fireEvent.click(screen.getByTestId('forgot-button'))

    await waitFor(() => expect(screen.getByTestId('forgot-form')).toBeInTheDocument())
  })

  test('Should ensure close modal if click cancel button', () => {
    makeSut()

    fireEvent.click(screen.getByTestId('forgot-button'))
    fireEvent.click(screen.getByTestId('forgot-cancel'))

    expect(screen.queryByText('Qual o e-mail do cadastro?')).toBeFalsy()
  })

  test('Should start initial with state', async () => {
    const validationError = faker.lorem.words()
    makeSut({ validationError })

    fireEvent.click(screen.getByTestId('forgot-button'))

    expect(screen.getByTestId('forgot-submit')).toBeDisabled()
    // expect(screen.getByTestId('input-email-forgot')).toHaveAttribute('data-status', '')
    Helpers.testStatusForField('input-email-forgot', validationError)
  })

  test('Should show email error in title if validations fails', () => {
    const validationError = faker.lorem.words()
    makeSut({ validationError })

    fireEvent.click(screen.getByTestId('forgot-button'))
    const input = Helpers.populateField('input-email-forgot')

    expect(input.title).toBe(validationError)
  })

  test('Should call ForgotYourPassword with correct value', async () => {
    const { forgotYourPasswordSpy } = makeSut()

    fireEvent.click(screen.getByTestId('forgot-button'))
    const email = faker.internet.email()
    await validSubmitForm(email)

    expect(forgotYourPasswordSpy.email).toBe(email)
  })

  test('Should call ForgotYourPassword only once', async () => {
    const { forgotYourPasswordSpy } = makeSut()

    fireEvent.click(screen.getByTestId('forgot-button'))
    Helpers.populateField('input-email-forgot')
    const form = screen.getByTestId('forgot-form')
    fireEvent.submit(form)
    fireEvent.submit(form)

    await waitFor(() => expect(forgotYourPasswordSpy.callsCount).toBe(1))
  })

  test('Should not call ForgotYourPassword if form is invalid', () => {
    const validationError = faker.lorem.words()
    const { forgotYourPasswordSpy } = makeSut({ validationError })

    fireEvent.click(screen.getByTestId('forgot-button'))
    Helpers.populateField('input-email-forgot')
    fireEvent.submit(screen.getByTestId('forgot-form'))

    expect(forgotYourPasswordSpy.callsCount).toBe(0)
  })

  test('Should ensure show FormStatus with IsFacebookError or UserNotFoundError if returns Error', async () => {
    const { forgotYourPasswordSpy } = makeSut()
    const error = faker.random.arrayElement([new IsFacebookError(), new UserNotFoundError()])

    fireEvent.click(screen.getByTestId('forgot-button'))
    jest
      .spyOn(forgotYourPasswordSpy, 'sendEmail')
      .mockRejectedValueOnce(error)
    await validSubmitForm()

    expect(screen.getByTestId('main-info')).toHaveClass('isError')
    expect(screen.getByTestId('main-info')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should ensure show FormStatus with error message UnexpectedError if returns body empty', async () => {
    const { forgotYourPasswordSpy } = makeSut()
    const value = faker.random.arrayElement([undefined, null])

    fireEvent.click(screen.getByTestId('forgot-button'))
    jest
      .spyOn(forgotYourPasswordSpy, 'sendEmail')
      .mockReturnValueOnce(value)
    await validSubmitForm()

    expect(screen.getByTestId('main-info')).toHaveTextContent(new UnexpectedError().message)
  })

  test('Should ensure show FormStatus with email success message if returns ResetLinkSent', async () => {
    const { forgotYourPasswordSpy } = makeSut()

    fireEvent.click(screen.getByTestId('forgot-button'))
    jest
      .spyOn(forgotYourPasswordSpy, 'sendEmail')
      .mockReturnValueOnce(Promise.resolve({ success: true, type: ForgotPasswordResponseType.ResetLinkSent }))
    await validSubmitForm()

    expect(screen.getByTestId('main-info')).toHaveClass('isInfo')
    expect(screen.getByTestId('main-info')).toHaveTextContent('Um e-mail foi enviado para o endereço de e-mail informado')
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })
})
