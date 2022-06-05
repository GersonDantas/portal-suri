import { ValidationLinkProxy } from 'src/main/proxies'

import { render } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

type SutType = {
  baseElement: Element
}

const makeSut = (): SutType => {
  const { baseElement } = render(
    <RecoilRoot>
      <ValidationLinkProxy />
    </RecoilRoot>
  )

  return { baseElement }
}

describe('ValidationLinkProxy', () => {
  test('Should start ValidationLinkProxy with initial state', () => {
    const { baseElement } = makeSut()

    expect(baseElement.textContent).toBe('')
  })
})
