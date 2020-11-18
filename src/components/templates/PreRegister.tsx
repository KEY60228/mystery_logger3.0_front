import React, { FC } from 'react'

import { PreRegisterForm } from '../organisms/PreRegister/PreRegisterForm'
import { PreRegisterModal } from '../organisms/PreRegister/PreRegisterModal'

interface Props {
    email: string
    setEmail: (value: string) => void
    open: boolean
    setOpen: (value: boolean) => void
    preRegister: () => void
}

export const PreRegister: FC<Props> = ({
    email,
    setEmail,
    open,
    setOpen,
    preRegister,
}) => {
    return (
        <>
            <PreRegisterForm
                email={email}
                setEmail={setEmail}
                preRegister={preRegister}
            />
            <PreRegisterModal
                open={open}
                setOpen={setOpen}
                setEmail={setEmail}
            />
        </>
    )
}
