import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { LinearLoader } from '../../handlers/Loader/LinearLoader'
import { RootState } from '../../stores'

import { RegisterForm } from './components/RegisterForm'

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
    const loading = useSelector((state: RootState) => state.error.loading)

    return (
        <>
            {loading && <LinearLoader />}
            <RegisterForm {...props} />
        </>
    )
}
