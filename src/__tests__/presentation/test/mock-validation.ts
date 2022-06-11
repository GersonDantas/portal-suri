import { Validation } from 'src/presentation/protocols'

export class ValidationStub implements Validation {
  errorMessage?: string

  validate (fieldName: string, input: object): string {
    return this.errorMessage
  }
}
