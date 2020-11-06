import React, { FC, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../stores/index'
import { asyncPreRegister } from '../ajax/auth'
import { PreRegister as PreRegisterTemp } from '../components/templates/PreRegister'
import { setPreRegisterStatus } from '../stores/auth'

export const PreRegister: FC = () => {
    const dispatch = useDispatch()

    const preRegisterStatus = useSelector((state: RootState) => state.auth.preRegisterStatus)

    const [email, setEmail] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false) // templatesに持たせる？

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
