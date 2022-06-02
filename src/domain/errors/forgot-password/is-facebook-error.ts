export class IsFacebookError extends Error {
  constructor () {
    super('A conta foi criada com Facebook')
    this.name = 'IsFacebookError'
  }
}
