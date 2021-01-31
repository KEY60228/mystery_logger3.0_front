import React, { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import { asyncRegister, asyncVerify } from '../../ajax/auth'
import { useAppDispatch } from '../../stores/index'
import { setMessage } from '../../stores/error'

import { FailVerify as FailVerifyTemp } from './FailVerify'
import { Register as RegisterTemp } from './template'
import { CircularLoader } from '../../reusable/Loader/CircularLoader'

export const Register: FC = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const query = queryString.parse(useLocation().search)

    const [registerStatus, setRegisterStatus] = useState<boolean | null>(null)
    const [accountId, setAccountId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [preRegisterId, setPreRegisterId] = useState<number>(0)

    const verify = () => {
        dispatch(asyncVerify(query))
            .then((result) => {
                setEmail(result.email)
                setPreRegisterId(result.pre_register_id)
                setRegisterStatus(true)
            })
            .catch(() => setRegisterStatus(false))
    }

    const register = () => {
        dispatch(asyncRegister(accountId, email, name, password, preRegisterId))
            .then(result => history.push(`/users/${result.account_id}`))
            .catch(() => {return})
    }

    useEffect(() => {
        dispatch(setMessage(null))
        verify()
    }, [])

    return (
        <>
            <Helmet>
                <title>本登録 - なぞログ</title>
            </Helmet>
            {registerStatus === true && (
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
            {registerStatus === false && <FailVerifyTemp />}
            {registerStatus === null && <CircularLoader />}
        </>
    )
}
