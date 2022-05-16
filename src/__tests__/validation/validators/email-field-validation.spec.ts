import { InvalidFieldError } from 'src/validation/errors'
import { EmailFieldValidation } from 'src/validation/validators'

import faker from '@faker-js/faker'

describe('EmailFieldValidation', () => {
  test('Should returns error if email is invalid', () => {
    const sut = new EmailFieldValidation('email')
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError('email'))
  })

  test('Should returns falsy if email is valid', () => {
    const sut = new EmailFieldValidation('email')
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
