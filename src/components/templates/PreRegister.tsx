import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { PreRegisterForm } from '../organisms/PreRegister/PreRegisterForm'
import { PreRegisterModal } from '../organisms/PreRegister/PreRegisterModal'

interface Props {
    email: string
    setEmail: (value: string) => void
    open: boolean
    setOpen: (value: boolean) => void
    preRegister: () => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
        },
        paper: {
            margin: '12px',
        },
        subtitle: {
            width: '100%',
            textAlign: 'center',
            borderBottom: '1px groove grey',
            padding: '24px',
        },
    }),
)

export const PreRegister: FC<Props> = ({
    email,
    setEmail,
    open,
    setOpen,
    preRegister,
}) => {
    const classes = useStyles()

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
