import { InvalidPasswordError } from 'src/validation/errors'
import { FieldValidation } from 'src/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) { }

  validate (value: string): Error {
    return value.length >= this.minLength ? null : new InvalidPasswordError()
  }
}
