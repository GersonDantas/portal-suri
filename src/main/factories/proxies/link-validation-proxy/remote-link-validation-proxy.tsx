import { makeRemoteLinkValidation } from 'src/main/factories/usecases'
import { LinkValidationProxy } from 'src/main/proxies'

import React from 'react'

export const makeValidationLinkProxy: React.FC = () => {
  return <LinkValidationProxy linkValidation={makeRemoteLinkValidation()} />
}

export default makeValidationLinkProxy
