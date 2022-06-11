import { InvalidEmailError } from 'src/validation/errors'
import { EmailFieldValidation } from 'src/validation/validators'

import faker from '@faker-js/faker'

const makeSut = (field: string): EmailFieldValidation => new EmailFieldValidation(field)

describe('EmailFieldValidation', () => {
  test('Should returns error if email is invalid', () => {
    const field = faker.internet.userName().replace(/[!#$%&'*+/=?^_`{|}~-]/gi, '')
    const sut = makeSut(field)
    const email = `${field}@${faker.lorem.words(15).replace(/\s./g, '')}.${field}`

    const errorEmail = sut.validate({ [field]: faker.database.column() })
    const errorMinAfter = sut.validate({
      [field]: `${field}@${email}.${field}`
    })

    expect(errorEmail).toEqual(new InvalidEmailError())
    expect(errorMinAfter).toEqual(new InvalidEmailError())
  })

  test('Should returns falsy if email is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const email = faker.internet.email().replace(/[!#$%&'*+/=?^_`{|}~-]/gi, '')

    const error = sut.validate({ [field]: email })

    expect(error).toBeFalsy()
  })

  test('Should returns falsy if email is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: '' })

    expect(error).toBeFalsy()
  })
})
