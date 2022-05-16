export class InvalidPasswordError extends Error {
  constructor () {
    super('Por favor, forneça ao menos 6 caracteres.')
    this.name = 'InvalidEmailError'
  }
}
