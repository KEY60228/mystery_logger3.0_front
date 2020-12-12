import React, { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import queryString from 'query-string'

import { asyncRegister, asyncVerify } from '../ajax/auth'
import { RootState, useAppDispatch } from '../stores/index'
import { FailVerify as FailVerifyTemp } from '../components/templates/FailVerify'
import { Register as RegisterTemp } from '../components/templates/Register'

export const Register: FC = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const query = queryString.parse(useLocation().search)

    const currentUser = useSelector((state: RootState) => state.auth.user)
    
    const [registerStatus, setRegisterStatus] = useState<boolean | null>(null)
    const [accountId, setAccountId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [preRegisterId, setPreRegisterId] = useState<number>(0)

    const verify = () => {
        dispatch(asyncVerify(query, setPreRegisterId, setEmail)).then(
            () => setRegisterStatus(true)
        ).catch(
            () => setRegisterStatus(false)
        )
    }

    const register = () => {
        dispatch(asyncRegister(accountId, email, name, password, preRegisterId))
    }

    useEffect(() => {
        verify()
    }, [])

    useEffect(() => {
        if (currentUser) {
            history.push(`/users/${currentUser.account_id}`)
        }
    }, [currentUser])

    return (
        <>
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
            {registerStatus === null && <div>loading</div>}
        </>
    )
}
