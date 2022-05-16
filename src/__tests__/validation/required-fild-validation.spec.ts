import { RequiredFieldError } from 'src/validation/errors'
import { RequiredFieldValidation } from 'src/validation/validators'

import faker from '@faker-js/faker'

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate(faker.random.words())
    expect(error).toBeFalsy()
  })
})