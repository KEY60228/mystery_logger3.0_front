import React, { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { asyncPreRegister } from '../../ajax/auth'
import { useAppDispatch } from '../../stores/index'
import { setMessage } from '../../stores/error'

import { PreRegisterTemplate as Template } from './layout'

export const PreRegister: FC = () => {
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)

    const preRegister = () => {
        dispatch(asyncPreRegister(email))
            .then(
                () => setOpen(true),
            )
            .catch(
                () => {return}
            )
    }

    useEffect(() => {
        dispatch(setMessage(null))
    }, [])

    return (
        <>
            <Helmet>
                <title>仮登録 - なぞログ</title>
            </Helmet>
            <Template
                email={email}
                setEmail={setEmail}
                open={open}
                setOpen={setOpen}
                preRegister={preRegister}
            />
        </>
    )
}
