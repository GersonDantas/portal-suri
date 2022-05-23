import { InvalidEmailError } from 'src/validation/errors'
import { FieldValidation } from 'src/validation/protocols'

export class EmailFieldValidation implements FieldValidation {
  constructor (readonly field: string) { }

  validate (value: string): Error {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
    return (!value || emailRegex.test(value)) ? null : new InvalidEmailError()
  }
}
