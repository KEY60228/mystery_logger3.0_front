import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { LinearLoader } from '../../reusable/Loader/LinearLoader'
import { RootState } from '../../stores'
import { LoginForm } from '../organisms/Login/LoginForm'

interface Props {
    email: string
    setEmail: (value: string) => void
    password: string
    setPassword: (value: string) => void
    login: () => void
}

export const Login: FC<Props> = props => {
    const loading = useSelector((state: RootState) => state.error.loading)

    return (
        <>
            {loading && <LinearLoader />}
            <LoginForm {...props} />
        </>
    )
}
