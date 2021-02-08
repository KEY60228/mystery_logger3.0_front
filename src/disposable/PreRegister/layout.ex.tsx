import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { LinearLoader } from '../../reusable/Loader/LinearLoader'
import { RootState } from '../../stores'

import { PreRegisterForm } from './components/PreRegisterForm'
import { PreRegisterModal } from './components/PreRegisterModal'

interface Props {
    email: string
    setEmail: (value: string) => void
    open: boolean
    setOpen: (value: boolean) => void
    preRegister: () => void
}

export const PreRegisterTemplate: FC<Props> = props => {
    const loading = useSelector((state: RootState) => state.error.loading)

    return (
        <>
            {loading && <LinearLoader />}
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
