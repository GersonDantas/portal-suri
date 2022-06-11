import { InvalidFieldError } from 'src/validation/errors'
import { FieldValidation } from 'src/validation/protocols'

export class CompareFieldValidation implements FieldValidation {
  constructor (readonly field: string, readonly fieldToCompare: string) { }

  validate (input: object): Error {
    return new InvalidFieldError()
  }
}
