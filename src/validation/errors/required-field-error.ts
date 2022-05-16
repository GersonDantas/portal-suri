export class RequiredFieldError extends Error {
  constructor () {
    super('Este campo obrigatório.')
    this.name = 'RequiredFieldError'
  }
}
