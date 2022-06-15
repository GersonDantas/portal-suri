import { InvalidFieldError } from 'src/validation/errors'
import { CompareFieldValidation } from 'src/validation/validators'

import faker from '@faker-js/faker'

const makeSut = (field: string, fieldToCompare: string): CompareFieldValidation =>
  new CompareFieldValidation(field, fieldToCompare)

describe('CompareFieldValidation', () => {
  test('Should return error if compare is inválid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)

    const error = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value'
    })

    expect(error).toEqual(new InvalidFieldError())
  })
})
