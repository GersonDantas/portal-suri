import { Validation } from 'src/presentation/protocols'

export class ValidationSpy implements Validation {
  errorMessage!: string
  fieldName!: string
  fieldValue!: string

  validate (fieldName: string, fieldValue: string): string {
    this.fieldValue = fieldValue
    this.fieldName = fieldName
    return this.errorMessage
  }
}
