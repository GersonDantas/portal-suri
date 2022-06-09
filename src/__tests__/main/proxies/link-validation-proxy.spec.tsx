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
  history: MemoryHistory
  linkValidationSpy: LinkValidationSpy
}

type SutParams = {
  email: string
  exp: string
  hash: string
}

const populateParams = (): SutParams => {
  const email = faker.internet.email()
  const exp = faker.datatype.datetime().toString()
  const hash = faker.datatype.uuid()

  return { email, exp, hash }
}

const makeSut = (
  { email, exp, hash }: SutParams = populateParams()
): SutType => {
  const history = createMemoryHistory({
    initialEntries: [
      `/?mode=recover-password&email=${email}&exp=${exp}&k=${hash}`, '/erro'],
    initialIndex: 0
  })
  const linkValidationSpy = new LinkValidationSpy()
  render(
    <RecoilRoot>
      <IonReactRouter>
        <Router history={history}>
          <IonRouterOutlet>
            <LinkValidationProxy
              path='/' component={ForgotPasswordPage}
              linkValidation={linkValidationSpy}
            />
          </IonRouterOutlet>
        </Router>
      </IonReactRouter>
    </RecoilRoot>
  )

  return {
    history,
    linkValidationSpy
  }
}

describe('LinkValidationProxy', () => {
  test('Should LinkValidationProxy render to "/" if RemoteValidation success', async () => {
    const { linkValidationSpy, history } = makeSut()
    linkValidationSpy.response = { success: true, type: 5 }

    await waitFor(() => expect(history.location.pathname).toBe('/'))
  })

  test('Should LinkValidationProxy render to ErrorPage if linkValidation fails', async () => {
    const { linkValidationSpy, history } = makeSut()
    const error = new UnexpectedError()

    jest
      .spyOn(linkValidationSpy, 'validate')
      .mockRejectedValueOnce(new UnexpectedError())

    await waitFor(() => expect(screen.getByTestId('main-error')).toHaveTextContent(error.message))
    expect(history.location.pathname).toBe('/erro')
  })
})
