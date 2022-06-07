// TODO: Este arquivo deve ser apagado, criado por enquanto a api não dá resposta
import { RemoteLinkValidationSpy } from 'src/__tests__/data/mock'
import { LinkValidation } from 'src/domain/usecases'
import { LinkValidationProxy } from 'src/main/proxies'

import React from 'react'

type Props = LinkValidation.Response

export const mockMakeValidationLinkProxy: React.FC<Props> = (response) => {
  const remoteLinkValidationSpy = new RemoteLinkValidationSpy()
  remoteLinkValidationSpy.response = response
  return <LinkValidationProxy linkValidation={remoteLinkValidationSpy} />
}

export default mockMakeValidationLinkProxy
