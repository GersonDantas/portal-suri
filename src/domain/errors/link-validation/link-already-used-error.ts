export class LinkAlreadyUsedError extends Error {
  constructor () {
    super('Este link já foi usado!')
    this.name = 'LinkAlreadyUsedError'
  }
}
