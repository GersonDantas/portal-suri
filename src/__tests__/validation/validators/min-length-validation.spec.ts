import { InvalidPasswordError } from 'src/validation/errors'
import { MinLengthValidation } from 'src/validation/validators'

import faker from '@faker-js/faker'

const makeSut = (minLength: number): MinLengthValidation => new MinLengthValidation(faker.database.column(), minLength)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut(6)
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidPasswordError())
  })

  test('Should return falsy if value is valid', () => {
    const sut = makeSut(5)
    const error = sut.validate(faker.random.alphaNumeric(6))
    expect(error).toBeFalsy()
  })
})
