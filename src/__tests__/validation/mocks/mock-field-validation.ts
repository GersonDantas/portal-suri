import { FieldValidation } from 'src/validation/protocols'

export class FieldValidationSpy implements FieldValidation {
  error: Error = null
  constructor (readonly field: string) { }

  validate (input: object): Error {
    return this.error
  }
}
