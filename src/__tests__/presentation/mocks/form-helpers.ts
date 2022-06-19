import faker from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react'

export const testStatusForField = (fieldName: string, validationError = ''): void => {
  populateField(fieldName)
  const field = screen.getByTestId(fieldName)
  expect(field).toHaveProperty('title', validationError)
  expect(field).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
}

export const populateField = (fieldName: string, value = faker.internet.email()): HTMLElement => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })

  return input
}
