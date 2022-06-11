import { InvalidPasswordError } from 'src/validation/errors'
import { FieldValidation } from 'src/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) { }

  validate (input: object): Error {
    return input[this.field].length >= this.minLength ? null : new InvalidPasswordError()
  }
}
