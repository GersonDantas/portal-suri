import { LinkValidationSpy } from 'src/__tests__/data/mock'
import { UnexpectedError } from 'src/domain/errors'
import { LinkValidationProxy } from 'src/main/proxies'
import { ForgotPasswordPage } from 'src/presentation/pages'

import faker from '@faker-js/faker'
import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

type SutType = {
  createHistory: MemoryHistory
}

type SutParams = {
  linkValidationSpy?: LinkValidationSpy
  fallbackRoute?: string
  urlWithParams?: boolean
  hash?: string
  email?: string
}

const makeSut = ({ linkValidationSpy, fallbackRoute, urlWithParams, email, hash }: SutParams = {
  linkValidationSpy: new LinkValidationSpy(),
  fallbackRoute: faker.internet.url(),
  urlWithParams: true,
  hash: faker.datatype.uuid(),
  email: faker.internet.email()
}): SutType => {
  const exp = faker.datatype.datetime().toString()
  const createHistory = createMemoryHistory({
    initialEntries: [urlWithParams ? '/' : `/?mode=recover-password&email=${email}&exp=${exp}&k=${hash}`]
  })
  render(
    <RecoilRoot>
      <IonReactRouter>
        <Router history={createHistory}>
          <IonRouterOutlet>
            <LinkValidationProxy
              fallbackRoute={fallbackRoute}
              path='/' component={ForgotPasswordPage}
              linkValidation={linkValidationSpy}
            />
          </IonRouterOutlet>
        </Router>
      </IonReactRouter>
    </RecoilRoot>
  )

  return {
    createHistory
  }
}

describe('LinkValidationProxy', () => {
  test('Should LinkValidationProxy render to fallback', async () => {
    const fallbackRoute = faker.internet.url()
    const { createHistory } = makeSut({ fallbackRoute, urlWithParams: true })

    await waitFor(() => expect(createHistory.location.pathname).toBe(fallbackRoute))
  })

  test('Should LinkValidationProxy render to "/mudar-senha/:email/:hash" with params if RemoteValidation success', async () => {
    const linkValidationSpy = new LinkValidationSpy()
    linkValidationSpy.response = { success: true, type: 5 }
    const hash = faker.datatype.uuid()
    const email = faker.internet.email()
    const { createHistory } = makeSut({ linkValidationSpy, email, hash })

    await waitFor(() => expect(createHistory.location.pathname).toBe(`/mudar-senha/${email}/${hash}`))
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
    const { createHistory } = makeSut({ linkValidationSpy, fallbackRoute })
    await waitFor(() => screen.getByTestId('main-error'))
    fireEvent.click(screen.getByTestId('go-fall-back'))

    expect(createHistory.location.pathname).toBe(fallbackRoute)
  })
})
