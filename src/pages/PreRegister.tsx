import React, { FC, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../stores/index'
import { asyncPreRegister } from '../ajax/auth'
import { PreRegister as PreRegisterTemp } from '../templates/PreRegister'

export const PreRegister: FC = () => {
    const dispatch = useDispatch()

    const apiStatus = useSelector((state: RootState) => state.auth.apiStatus)

    const [email, setEmail] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)

    const preRegister = () => {
        dispatch(asyncPreRegister(email))
    }

    useEffect(() => {
        if (apiStatus) {
            setOpen(true)
        }
    }, [apiStatus])

    return (
        <PreRegisterTemp
            email={email}
            setEmail={setEmail}
            open={open}
            setOpen={setOpen}
            preRegister={preRegister}
        />
    )
}