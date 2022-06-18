export class UnchangedPasswordError extends Error {
  constructor () {
    super('Não conseguimos alterar sua senha!')
    this.name = 'UnchangedPasswordError'
  }
}
