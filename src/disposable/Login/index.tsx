import React, { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'

import { LoginData } from '../../@types'
import { asyncLogin } from '../../ajax/auth'
import { useAppDispatch } from '../../stores/index'
import { setMessage } from '../../stores/error'

import { LoginTemplate as Template } from './layout'

export const Login: FC = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()

    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: '',
    })

    const login = () => {
        dispatch(asyncLogin(loginData.email, loginData.password))
            .then(result => history.push(`/users/${result.account_id}`))
            .catch(() => {return})
    }

    useEffect(() => {
        dispatch(setMessage(null))
    }, [])

    return (
        <>
            <Helmet>
                <title>ログイン - なぞログ</title>
            </Helmet>
            <Template
                login={login}
                loginData={loginData}
                setLoginData={setLoginData}
            />
        </>
    )
}
