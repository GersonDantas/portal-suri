import { InvalidFieldError } from 'src/validation/errors'
import { EmailFieldValidation } from 'src/validation/validators'

describe('EmailFieldValidation', () => {
  test('Should returns error if email field is invalid', () => {
    const sut = new EmailFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError('email'))
  })
})
