import { LinkValidationSpy } from 'src/__tests__/data/mock'
import { userInfoResetPasswordState } from 'src/__tests__/main/factories/mock'
import { UnexpectedError } from 'src/domain/errors'
import { UserInfoResetPassword } from 'src/domain/usecases'
import { MakeForgotPasswordPage } from 'src/main/factories/pages'
import { LinkValidationProxy } from 'src/main/proxies'

import faker from '@faker-js/faker'
import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import { MutableSnapshot, RecoilRoot } from 'recoil'

type SutType = {
  history: MemoryHistory
  setUserInfoResetPasswordMock: (userInfo: UserInfoResetPassword) => Promise<void>
}

type SutParams = {
  linkValidationSpy?: LinkValidationSpy
  fallbackRoute?: string
  urlWithParams?: boolean
  email?: string
  hash?: string
}

const makeSut = ({ linkValidationSpy, fallbackRoute, urlWithParams, email, hash }: SutParams = {
  linkValidationSpy: new LinkValidationSpy(),
  fallbackRoute: faker.internet.url(),
  urlWithParams: true,
  email: faker.internet.email(),
  hash: faker.datatype.uuid()
}): SutType => {
  const setUserInfoResetPasswordMock = jest.fn().mockResolvedValue(Promise.resolve())
  const exp = faker.datatype.datetime().toString()
  const history = createMemoryHistory({
    initialEntries: [urlWithParams ? '/' : `/?mode=recover-password&email=${email}&exp=${exp}&k=${hash}`]
  })
  render(
    <RecoilRoot initializeState={({ set }: MutableSnapshot) => {
      set(userInfoResetPasswordState, {
        setUserInfoResetPassword: setUserInfoResetPasswordMock,
        getUserInfoResetPassword: jest.fn()
      })
    }}
    >
      <IonReactRouter>
        <Router history={history}>
          <IonRouterOutlet>
            <LinkValidationProxy
              fallbackRoute={fallbackRoute}
              path='/' component={MakeForgotPasswordPage}
              linkValidation={linkValidationSpy}
            />
          </IonRouterOutlet>
        </Router>
      </IonReactRouter>
    </RecoilRoot>
  )

  return {
    history,
    setUserInfoResetPasswordMock
  }
}

describe('LinkValidationProxy', () => {
  test('Should LinkValidationProxy render to fallback', async () => {
    const fallbackRoute = faker.internet.url()
    const { history } = makeSut({ fallbackRoute, urlWithParams: true })

    await waitFor(() => expect(history.location.pathname).toBe(fallbackRoute))
  })

  test('Should LinkValidationProxy render to "/" with params if RemoteValidation success', () => {
    const linkValidationSpy = new LinkValidationSpy()
    linkValidationSpy.response = { success: true, type: 5 }
    const { history } = makeSut({ linkValidationSpy })

    expect(history.location.pathname).toBe('/')
  })

  test('Should LinkValidationProxy render to ErrorPage if linkValidation fails', async () => {
    const linkValidationSpy = new LinkValidationSpy()
    const error = new UnexpectedError()
    jest.spyOn(linkValidationSpy, 'validate').mockRejectedValueOnce(error)
    makeSut({ linkValidationSpy })

    await waitFor(() => expect(screen.getByTestId('main-error')).toHaveTextContent(error.message))
  })

  test('Should LinkValidationProxy render to ErrorPage if linkValidation fails', async () => {
    const linkValidationSpy = new LinkValidationSpy()
    const fallbackRoute = faker.internet.url()
    const error = new UnexpectedError()
    jest.spyOn(linkValidationSpy, 'validate').mockRejectedValueOnce(error)
    const { history } = makeSut({ linkValidationSpy, fallbackRoute })
    await waitFor(() => screen.getByTestId('main-error'))
    fireEvent.click(screen.getByTestId('go-fall-back'))

    expect(history.location.pathname).toBe(fallbackRoute)
  })

  test('Should ensure that ResetPassword will save the return in localstorage on success', async () => {
    const linkValidationSpy = new LinkValidationSpy()
    linkValidationSpy.response = { success: true, type: 5 }
    const email = faker.internet.email()
    const hash = faker.datatype.uuid()
    const { history, setUserInfoResetPasswordMock } = makeSut({ linkValidationSpy, email, hash })

    await waitFor(() => expect(setUserInfoResetPasswordMock).toHaveBeenCalledWith({ email, hash }))
    expect(history.location.pathname).toBe('/')
    expect(history.index).toBe(0)
  })
})
