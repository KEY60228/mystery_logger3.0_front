import React, { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { asyncPreRegister } from '../ajax/auth'
import { useAppDispatch } from '../stores/index'
import { PreRegister as PreRegisterTemp } from '../components/templates/PreRegister'
import { setMessage } from '../stores/error'

export const PreRegister: FC = () => {
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)

    const preRegister = () => {
        dispatch(asyncPreRegister(email))
            .then(
                () => setOpen(true), // 成功時挙動
            )
            .catch()
    }

    useEffect(() => {
        dispatch(setMessage(null))
    }, [])

    return (
        <>
            <Helmet>
                <title>仮登録 - なぞログ</title>
            </Helmet>
            <PreRegisterTemp
                email={email}
                setEmail={setEmail}
                open={open}
                setOpen={setOpen}
                preRegister={preRegister}
            />
        </>
    )
}
