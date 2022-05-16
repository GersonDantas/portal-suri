import { RequiredFieldError } from 'src/validation/errors'
import { FieldValidation } from 'src/validation/protocols'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {

  }

  validate (fieldValue: string): Error {
    return new RequiredFieldError()
  }
}
