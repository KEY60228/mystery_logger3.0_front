import React, { FC, useState } from 'react'

import { asyncPreRegister } from '../ajax/auth'
import { useAppDispatch } from '../stores/index'
import { PreRegister as PreRegisterTemp } from '../components/templates/PreRegister'

export const PreRegister: FC = () => {
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)

    const preRegister = () => {
        dispatch(asyncPreRegister(email)).then(
            () => setOpen(true) // 成功時挙動
        ).catch(
            (error) => console.log(error) // 失敗時挙動
        )
    }

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
