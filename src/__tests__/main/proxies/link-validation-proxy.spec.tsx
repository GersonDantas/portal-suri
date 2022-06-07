import { RemoteLinkValidationSpy } from 'src/__tests__/data/mock'
import { LinkValidation } from 'src/domain/usecases'
import { LinkValidationProxy } from 'src/main/proxies'

import faker from '@faker-js/faker'
import { IonReactRouter } from '@ionic/react-router'
import { render, waitFor } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

type SutType = {
  history: MemoryHistory
  baseElement: Element
  remoteLinkValidationSpy: RemoteLinkValidationSpy
}

const makeSut = (
  response: LinkValidation.Response,
  email = faker.internet.email(),
  exp = faker.datatype.datetime(),
  hash = faker.datatype.uuid()
): SutType => {
  const history = createMemoryHistory({
    initialEntries: [
      `/?mode=recover-password&email=${email}&exp=${exp}&k=${hash}`]
  })
  const remoteLinkValidationSpy = new RemoteLinkValidationSpy()
  remoteLinkValidationSpy.response = response
  const { baseElement } = render(
    <RecoilRoot>
      <IonReactRouter>
        <Router history={history}>
          <LinkValidationProxy
            path='/'
            linkValidation={remoteLinkValidationSpy}
          />
        </Router>
      </IonReactRouter>
    </RecoilRoot>
  )

  return {
    history,
    baseElement,
    remoteLinkValidationSpy
  }
}

describe('LinkValidationProxy', () => {
  test('Should LinkValidationProxy render to "/" if RemoteValidation success', async () => {
    const { history, baseElement } = makeSut({ success: true, type: 5 })

    await waitFor(() => expect(baseElement).toBeDefined())
    expect(history.location.pathname).toBe('/mudar-senha')
  })

  test('Should LinkValidationProxy render to ErrorPage if linkValidation fails', async () => {
    const { history, baseElement } = makeSut({ success: false, type: 4 })

    await waitFor(() => expect(baseElement).toBeDefined())
    expect(history.location.pathname).toBe('/erro')
  })
})
