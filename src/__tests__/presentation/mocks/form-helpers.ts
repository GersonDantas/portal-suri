import faker from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react'

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  populateField(fieldName)
  const input = screen.getByTestId(fieldName)
  expect(input.title).toBe(validationError ?? 'ok')
}

export const populateField = (fieldName: string, value = faker.internet.email()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}
