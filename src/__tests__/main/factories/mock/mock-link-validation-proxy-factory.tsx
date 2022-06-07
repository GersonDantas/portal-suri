// TODO: Este arquivo deve ser apagado, criado por enquanto a api não dá resposta
import { RemoteLinkValidationSpy } from 'src/__tests__/data/mock'
import { LinkValidationResponseType } from 'src/domain/models'
import { LinkValidationProxy } from 'src/main/proxies'
import { ForgotPasswordPage } from 'src/presentation/pages'

import React from 'react'

type Props = {
  success: boolean
  type: LinkValidationResponseType
}

export const MockMakeValidationLinkProxy: React.FC<Props> = (response) => {
  const remoteLinkValidationSpy = new RemoteLinkValidationSpy()
  remoteLinkValidationSpy.response = response
  return <LinkValidationProxy path='/' component={ForgotPasswordPage} linkValidation={remoteLinkValidationSpy} />
}

export default MockMakeValidationLinkProxy
