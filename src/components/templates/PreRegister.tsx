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

export const PreRegister: FC<Props> = props => {
    return (
        <>
            <PreRegisterForm
                email={props.email}
                setEmail={props.setEmail}
                preRegister={props.preRegister}
            />
            <PreRegisterModal
                open={props.open}
                setOpen={props.setOpen}
                setEmail={props.setEmail}
            />
        </>
    )
}
