import { InvalidFieldError } from 'src/validation/errors'
import { MinLengthValidation } from 'src/validation/validators'

import faker from '@faker-js/faker'

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = new MinLengthValidation('password', 6)
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError('password'))
  })

  test('Should return falsy if value is valid', () => {
    const sut = new MinLengthValidation('password', 5)
    const error = sut.validate(faker.random.alphaNumeric(6))
    expect(error).toBeFalsy()
  })
})
