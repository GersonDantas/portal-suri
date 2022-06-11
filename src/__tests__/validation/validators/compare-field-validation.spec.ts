import { InvalidFieldError } from 'src/validation/errors'
import { CompareFieldValidation } from 'src/validation/validators'

import faker from '@faker-js/faker'

describe('CompareFieldValidation', () => {
  test('Should return error if compare is inválid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = new CompareFieldValidation(field, fieldToCompare)

    const error = sut.validate({})

    expect(error).toEqual(new InvalidFieldError())
  })
})
