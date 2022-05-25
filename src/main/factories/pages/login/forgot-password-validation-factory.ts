import { ValidationBuilder } from 'src/main/builders'
import { ValidationComposite } from 'src/validation/validators'

export const makeForgotPasswordValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('forgot').required().email().build()
  ])
}
