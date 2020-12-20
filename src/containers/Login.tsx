import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { asyncLogin } from '../ajax/auth'
import { RootState, useAppDispatch } from '../stores/index'
import { Login as LoginTemp } from '../components/templates/Login'

export const Login: FC = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const login = () => {
        dispatch(asyncLogin(email, password)).then(
            () => history.push(`/users/${currentUser?.account_id}`)
        ).catch()
    }

    return (
        <>
            <LoginTemp
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                login={login}
            />
        </>
    )
}
