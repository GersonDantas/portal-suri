import { InvalidEmailError } from 'src/validation/errors'
import { EmailFieldValidation } from 'src/validation/validators'

import faker from '@faker-js/faker'

const makeSut = (): EmailFieldValidation => new EmailFieldValidation(faker.database.column())

describe('EmailFieldValidation', () => {
  test('Should returns error if email is invalid', () => {
    const sut = makeSut()
    const name = faker.internet.userName().replace(/[!#$%&'*+/=?^_`{|}~-]/gi, '')
    const email = `${name}@${faker.lorem.words(15).replace(/\s./g, '')}.${name}`
    const errorEmail = sut.validate(name)

    const errorMinAfter = sut.validate(
      `${name}@${email}.${name}`
    )

    expect(errorEmail).toEqual(new InvalidEmailError())
    expect(errorMinAfter).toEqual(new InvalidEmailError())
  })

  test('Should returns falsy if email is valid', () => {
    const sut = makeSut()
    const email = faker.internet.email().replace(/[!#$%&'*+/=?^_`{|}~-]/gi, '')

    const error = sut.validate(email)

    expect(error).toBeFalsy()
  })

  test('Should returns falsy if email is empty', () => {
    const sut = makeSut()

    const error = sut.validate('')

    expect(error).toBeFalsy()
  })
})
