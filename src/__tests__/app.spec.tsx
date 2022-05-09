
import App from 'src/main/App'

import { render } from '@testing-library/react'
import React from 'react'


test('Should renders without crashing', () => {
  const { baseElement } = render(<App />)
  expect(baseElement).toBeDefined()
})
