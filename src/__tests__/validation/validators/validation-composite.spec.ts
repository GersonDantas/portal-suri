import { FieldValidationSpy } from '../mocks'
import { ValidationComposite } from 'src/validation/validators'

import faker from '@faker-js/faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidatorsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidatorsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = new ValidationComposite(fieldValidatorsSpy)
  return {
    sut,
    fieldValidatorsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.random.word()
    const { sut, fieldValidatorsSpy } = makeSut(fieldName)
    const errorMessage = faker.random.words()
    fieldValidatorsSpy[0].error = new Error(errorMessage)
    fieldValidatorsSpy[1].error = new Error(faker.random.words())

    const error = sut.validate(fieldName, faker.random.word())

    expect(error).toBe(errorMessage)
  })

  test('Should return falsy if validation has no error', () => {
    const fieldName = faker.random.word()
    const { sut } = makeSut(fieldName)

    const error = sut.validate(fieldName, faker.random.word())

    expect(error).toBeFalsy()
  })
})
