export class InvalidCredentialError extends Error {
  constructor () {
    super('Credênciais Inválidas')
    this.name = 'InvalidCredentialError'
  }
}
