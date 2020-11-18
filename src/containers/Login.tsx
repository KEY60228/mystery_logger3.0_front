import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { asyncLogin } from '../ajax/auth'
import { RootState } from '../stores/index'
import { Login as LoginTemp } from '../components/templates/Login'

export const Login: FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const login = () => {
        dispatch(asyncLogin(email, password))
    }

    useEffect(() => {
        if (currentUser) {
            history.push(`/users/${currentUser.account_id}`)
        }
    }, [currentUser])

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
