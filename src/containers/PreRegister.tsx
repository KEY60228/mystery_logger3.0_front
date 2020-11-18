import React, { FC, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { asyncPreRegister } from '../ajax/auth'
import { RootState } from '../stores/index'
import { setPreRegisterStatus } from '../stores/auth'
import { PreRegister as PreRegisterTemp } from '../components/templates/PreRegister'

export const PreRegister: FC = () => {
    const dispatch = useDispatch()

    const preRegisterStatus = useSelector((state: RootState) => state.auth.preRegisterStatus)

    const [email, setEmail] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)

    const preRegister = () => {
        dispatch(asyncPreRegister(email))
    }

    useEffect(() => {
        if (preRegisterStatus) {
            setOpen(true)
            dispatch(setPreRegisterStatus(null))
        }
    }, [preRegisterStatus])

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
