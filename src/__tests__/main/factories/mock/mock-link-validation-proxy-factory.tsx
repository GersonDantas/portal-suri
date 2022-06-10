// TODO: Este arquivo deve ser apagado, criado por enquanto a api não dá resposta
import { UnexpectedError } from 'src/domain/errors'
import { LinkValidationResponseType } from 'src/domain/models'
import { LinkValidation } from 'src/domain/usecases'
import { LinkValidationProxy } from 'src/main/proxies'
import { ForgotPasswordPage } from 'src/presentation/pages'

import React from 'react'

type Props = {
  success: boolean
  type?: LinkValidationResponseType
}

class LinkValidationSpy implements LinkValidation {
  response: LinkValidation.Response

  async validate (params: LinkValidation.Params): Promise<LinkValidation.Response> {
    if (this.response.success) {
      return Promise.resolve(this.response)
    } else {
      throw new UnexpectedError()
    }
  }
}

export const MockMakeValidationLinkProxy: React.FC<Props> = ({ success, type = 5 }) => {
  const linkValidationSpy = new LinkValidationSpy()
  linkValidationSpy.response = { success, type }
  return <LinkValidationProxy
    fallbackRoute='/login'
    path='/'
    component={ForgotPasswordPage}
    linkValidation={linkValidationSpy}
  />
}

export default MockMakeValidationLinkProxy
