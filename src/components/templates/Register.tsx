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

export const Register: FC<Props> = ({
    accountId,
    setAccountId,
    name,
    setName,
    password,
    setPassword,
    register,
}) => {
    return (
        <RegisterForm
            accountId={accountId}
            setAccountId={setAccountId}
            name={name}
            setName={setName}
            password={password}
            setPassword={setPassword}
            register={register}
        />
    )
}
