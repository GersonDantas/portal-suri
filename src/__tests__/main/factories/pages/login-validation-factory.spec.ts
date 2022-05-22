import { ValidationBuilder } from 'src/main/builders'
import { makeLoginValidation } from 'src/main/factories/pages'
import { ValidationComposite } from 'src/validation/validators'

describe('LoginValidationFactory', () => {
  test('Should make ValidationCompose with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(6).build()
    ]))
  })
})
