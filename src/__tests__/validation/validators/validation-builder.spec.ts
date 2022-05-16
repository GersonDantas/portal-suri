import { ValidationBuilder as sut } from 'src/main/builders'
import { RequiredFieldValidation } from 'src/validation/validators'

import faker from '@faker-js/faker'

describe('ValidationBuilder', () => {
  test('Should  return RequiredFieldValidation', () => {
    const fieldName = faker.database.column()

    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })

  test('Should  return EmailFieldValidation', () => {
    const fieldName = faker.database.column()

    const validations = sut.field(fieldName).email().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })
})
