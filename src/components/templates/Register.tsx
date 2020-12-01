import React, { FC } from 'react'

import { RegisterForm } from '../organisms/Register/RegisterForm'

interface Props {
    accountId: string
    setAccountId: (value: string) => void
    name: string
    setName: (value: string) => void
    password: string
    setPassword: (value: string) => void
    register: () => void
}

export const Register: FC<Props> = props => {
    return <RegisterForm {...props} />
}
