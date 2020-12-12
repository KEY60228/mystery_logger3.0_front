import React, { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { asyncPreRegister } from '../ajax/auth'
import { RootState, useAppDispatch } from '../stores/index'
import { setPreRegisterStatus } from '../stores/auth'
import { PreRegister as PreRegisterTemp } from '../components/templates/PreRegister'

export const PreRegister: FC = () => {
    const dispatch = useAppDispatch()

    const preRegisterStatus = useSelector(
        (state: RootState) => state.auth.preRegisterStatus,
    )

    const [email, setEmail] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)

    const preRegister = () => {
        dispatch(asyncPreRegister(email))
    }

    useEffect(() => {
        return () => {
            dispatch(setPreRegisterStatus(null))
        }
    }, [])

    useEffect(() => {
        if (preRegisterStatus) {
            setOpen(true)
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
