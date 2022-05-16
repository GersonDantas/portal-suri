import { FieldValidationSpy } from '../mocks'
import { ValidationComposite } from 'src/validation/validators'

type SutTypes = {
  sut: ValidationComposite
  fieldValidatorsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidatorsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = new ValidationComposite(fieldValidatorsSpy)
  return {
    sut,
    fieldValidatorsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidatorsSpy } = makeSut()
    fieldValidatorsSpy[0].error = new Error('first_error_message')
    fieldValidatorsSpy[1].error = new Error('second_error_message')
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error_message')
  })
})
