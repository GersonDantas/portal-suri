import { InvalidFieldError } from 'src/validation/errors'
import { FieldValidation } from 'src/validation/protocols'

export class EmailFieldValidation implements FieldValidation {
  constructor (readonly field: string) { }

  validate (value: string): Error {
    return new InvalidFieldError('email')
  }
}
