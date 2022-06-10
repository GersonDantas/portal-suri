import { LinkValidationSpy } from 'src/__tests__/data/mock'
import { UnexpectedError } from 'src/domain/errors'
import { LinkValidationProxy } from 'src/main/proxies'
import { ForgotPasswordPage } from 'src/presentation/pages'

import faker from '@faker-js/faker'
import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { render, waitFor, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

type SutType = {
  createHistory: MemoryHistory
  linkValidationSpy: LinkValidationSpy
}

type SutParams = {
  urlWithParams: boolean
  fallbackRoute?: string
}

const makeSut = ({ urlWithParams, fallbackRoute }: SutParams = {
  urlWithParams: true, fallbackRoute: faker.internet.url()
}): SutType => {
  const email = faker.internet.email()
  const exp = faker.datatype.datetime().toString()
  const hash = faker.datatype.uuid()
  const createHistory = createMemoryHistory({
    initialEntries: [`/?mode=recover-password&email=${email}&exp=${exp}&k=${hash}`]
  })
  urlWithParams || createHistory.replace('/')
  const linkValidationSpy = new LinkValidationSpy()
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
    createHistory,
    linkValidationSpy
  }
}

describe('LinkValidationProxy', () => {
  test('Should LinkValidationProxy render to ErrorPage if linkValidation fails', async () => {
    const fallbackRoute = faker.internet.url()
    const { createHistory } = makeSut({ urlWithParams: false, fallbackRoute })

    await waitFor(() => expect(createHistory.location.pathname).toBe(fallbackRoute))
  })

  test('Should LinkValidationProxy render to "/" if RemoteValidation success', async () => {
    const { linkValidationSpy, createHistory } = makeSut()
    linkValidationSpy.response = { success: true, type: 5 }

    await waitFor(() => expect(createHistory.location.pathname).toBe('/'))
  })

  test('Should LinkValidationProxy render to ErrorPage if linkValidation fails', async () => {
    const { linkValidationSpy } = makeSut()
    const error = new UnexpectedError()

    jest
      .spyOn(linkValidationSpy, 'validate')
      .mockRejectedValueOnce(new UnexpectedError())

    await waitFor(() => expect(screen.getByTestId('main-error')).toHaveTextContent(error.message))
  })
})
