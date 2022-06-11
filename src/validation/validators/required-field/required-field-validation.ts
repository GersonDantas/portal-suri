import { RequiredFieldError } from 'src/validation/errors'
import { FieldValidation } from 'src/validation/protocols'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) { }

  validate (input: object): Error {
    return input[this.field] !== '' ? null : new RequiredFieldError()
  }
}
