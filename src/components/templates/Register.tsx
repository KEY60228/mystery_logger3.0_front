import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { RegisterForm } from '../organisms/RegisterForm'

interface Props {
    accountId: string
    setAccountId: (value: string) => void
    name: string
    setName: (value: string) => void
    password: string
    setPassword: (value: string) => void
    register: () => void
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

export const Register: FC<Props> = ({
    accountId,
    setAccountId,
    name,
    setName,
    password,
    setPassword,
    register,
}) => {
    const classes = useStyles()

    return (
        <RegisterForm
            accountId={accountId}
            setAccountId={setAccountId}
            name={name}
            setName={setName}
            password={password}
            setPassword={setPassword}
            register={register}
        />
    )
}
