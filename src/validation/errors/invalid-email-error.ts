export class InvalidEmailError extends Error {
  constructor () {
    super('Por favor, forneça um endereço de email válido.')
    this.name = 'InvalidEmailError'
  }
}
