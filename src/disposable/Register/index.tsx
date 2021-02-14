import React, { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import { RegisterData } from '../../@types'
import { asyncRegister, asyncVerify } from '../../ajax/auth'
import { useAppDispatch } from '../../stores/index'
import { setMessage } from '../../stores/error'

import { RegisterTemplate as Template } from './layout'
import { CircularLoader } from '../../_reusable/Loader/CircularLoader'

export const Register: FC = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const query = queryString.parse(useLocation().search)

    const [registerData, setRegisterData] = useState<RegisterData>({
        accountId: '',
        name: '',
        password: '',
        email: '',
        preRegisterId: 0,
    })

    const verify = () => {
        dispatch(asyncVerify(query))
            .then((result) => {
                setRegisterData((prev: RegisterData) => ({
                    ...prev,
                    email: result.email,
                    preRegisterId: result.pre_register_id
                }))
            })
            .catch(() => history.push('/verify-failed'))
    }

    const register = () => {
        dispatch(asyncRegister(
            registerData.accountId,
            registerData.email,
            registerData.name,
            registerData.password,
            registerData.preRegisterId
        ))
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
            {registerData.preRegisterId !== 0 && (
                <Template
                    registerData={registerData}
                    setRegisterData={setRegisterData}
                    register={register}
                />
            )}
            {registerData.preRegisterId === 0 && <CircularLoader />}
        </>
    )
}
