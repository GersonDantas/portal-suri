import { FieldValidation } from 'src/validation/protocols'
import { CompareFieldValidation, EmailFieldValidation, MinLengthValidation, RequiredFieldValidation } from 'src/validation/validators'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validators: FieldValidation[]
  ) { }

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email (): ValidationBuilder {
    this.validators.push(new EmailFieldValidation(this.fieldName))
    return this
  }

  min (length: number): ValidationBuilder {
    this.validators.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  sameAs (fieldToCompare: string): ValidationBuilder {
    this.validators.push(new CompareFieldValidation(this.fieldName, fieldToCompare))
    return this
  }

  build (): FieldValidation[] {
    return this.validators
  }
}
