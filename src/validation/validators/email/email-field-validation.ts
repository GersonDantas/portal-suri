import { InvalidEmailError } from 'src/validation/errors'
import { FieldValidation } from 'src/validation/protocols'

export class EmailFieldValidation implements FieldValidation {
  constructor (readonly field: string) { }

  validate (input: object): Error {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
    return (!input[this.field] || emailRegex.test(input[this.field])) ? null : new InvalidEmailError()
  }
}
