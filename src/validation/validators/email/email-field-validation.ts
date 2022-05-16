import { InvalidEmailError } from 'src/validation/errors'
import { FieldValidation } from 'src/validation/protocols'

export class EmailFieldValidation implements FieldValidation {
  constructor (readonly field: string) { }

  validate (value: string): Error {
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    return emailRegex.test(value) ? null : new InvalidEmailError()
  }
}
