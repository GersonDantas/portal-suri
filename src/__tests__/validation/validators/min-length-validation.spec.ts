import { InvalidFieldError } from 'src/validation/errors'
import { FieldValidation } from 'src/validation/protocols'

class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private minLength: number) { }

  validate (value: string): Error {
    return new InvalidFieldError(this.field)
  }
}

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = new MinLengthValidation('password', 6)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError('password'))
  })
})
