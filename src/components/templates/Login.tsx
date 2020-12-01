import React, { FC } from 'react'

import { LoginForm } from '../organisms/Login/LoginForm'

interface Props {
    email: string
    setEmail: (value: string) => void
    password: string
    setPassword: (value: string) => void
    login: () => void
}

export const Login: FC<Props> = props => {
    return <LoginForm {...props} />
}
