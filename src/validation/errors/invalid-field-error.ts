export class InvalidFieldError extends Error {
  constructor (readonly fieldName: string) {
    super(`Por favor, forneça um ${fieldName} válido.`)
    this.name = 'InvalidFieldError'
  }
}
