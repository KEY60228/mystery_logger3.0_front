import React, { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string'

import { RootState } from '../stores/index'
import { asyncRegister, asyncVerify } from '../ajax/auth'
import { Register as RegisterTemp } from '../components/templates/Register'
import { FailVerify as FailVerifyTemp } from '../components/templates/FailVerify'

export const Register: FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const query = queryString.parse(useLocation().search)

    const user = useSelector((state: RootState) => state.auth.user)
    const apiStatus = useSelector((state: RootState) => state.error.apiStatus)

    const [accountId, setAccountId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [preRegisterId, setPreRegisterId] = useState<number>(0)

    const verify = () => {
        dispatch(asyncVerify(query, setPreRegisterId, setEmail))
    }

    const register = () => {
        dispatch(asyncRegister(accountId, email, name, password, preRegisterId))
    }

    useEffect(() => {
        verify()
    }, [])

    useEffect(() => {
        if (user) {
            history.push(`/users/${user.account_id}`)
        }
    }, [apiStatus])

    return (
        <>
            {apiStatus === true && (
                <RegisterTemp
                    accountId={accountId}
                    setAccountId={setAccountId}
                    name={name}
                    setName={setName}
                    password={password}
                    setPassword={setPassword}
                    register={register}
                />
            )}
            {apiStatus === false && <FailVerifyTemp />}
            {apiStatus === null && <div>loading</div>}
        </>
    )
}
