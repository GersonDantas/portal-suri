
import App from 'src/main/routes/router'

import { render, waitFor } from '@testing-library/react'
import React from 'react'

test('Should renders without crashing', async () => {
  const { baseElement } = render(<App />)
  await waitFor(() => expect(baseElement).toBeDefined())
})
