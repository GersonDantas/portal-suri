import { ValidationBuilder } from 'src/main/builders'
import { ValidationComposite } from 'src/validation/validators'

export const makeForgotPasswordPageValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('forgotPassword').required().min(6).build(),
    ...ValidationBuilder.field('forgotPasswordConfirmation').required().sameAs('forgotPassword').build()
  ])
}
