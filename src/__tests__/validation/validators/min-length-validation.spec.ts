import { InvalidPasswordError } from 'src/validation/errors'
import { MinLengthValidation } from 'src/validation/validators'

import faker from '@faker-js/faker'

type SutParams = {
  field: string
  minLength: number
}

const makeSut = ({ field, minLength }: SutParams): MinLengthValidation => new MinLengthValidation(field, minLength)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut({ field, minLength: 6 })

    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })

    expect(error).toEqual(new InvalidPasswordError())
  })

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut({ field, minLength: 5 })

    const error = sut.validate({ [field]: faker.random.alphaNumeric(6) })

    expect(error).toBeFalsy()
  })
})
