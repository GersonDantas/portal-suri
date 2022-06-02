export class InvalidResetLinkError extends Error {
  constructor () {
    super('O seu link é inválido!')
    this.name = 'InvalidResetLinkError'
  }
}
