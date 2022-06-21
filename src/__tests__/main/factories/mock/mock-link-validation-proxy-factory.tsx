// TODO: Este arquivo deve ser apagado, criado por enquanto a api não dá resposta
import { userInfoResetPasswordState } from './atoms'
import { UnexpectedError } from 'src/domain/errors'
import { LinkValidationResponseType } from 'src/domain/models'
import { LinkValidation } from 'src/domain/usecases'
import { getUserInfoResetPasswordAdapter, setUserInfoResetPasswordAdapter } from 'src/main/adapters'
import { MakeForgotPasswordPage } from 'src/main/factories/pages'
import { LinkValidationProxy } from 'src/main/proxies'

import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'

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
  return (
    <RecoilRoot initializeState={({ set }: MutableSnapshot) => {
      set(userInfoResetPasswordState, {
        setUserInfoResetPassword: setUserInfoResetPasswordAdapter,
        getUserInfoResetPassword: getUserInfoResetPasswordAdapter
      })
    }}
    >
      <LinkValidationProxy
        fallbackRoute='/login'
        path='/'
        component={MakeForgotPasswordPage}
        linkValidation={linkValidationSpy}
      />
    </RecoilRoot>
  )
}

export default MockMakeValidationLinkProxy
