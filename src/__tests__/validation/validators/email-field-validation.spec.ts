import { InvalidFieldError } from 'src/validation/errors'
import { EmailFieldValidation } from 'src/validation/validators'

import faker from '@faker-js/faker'

const makeSut = (): EmailFieldValidation => new EmailFieldValidation(faker.database.column())

describe('EmailFieldValidation', () => {
  test('Should returns error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError('email'))
  })

  test('Should returns falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
