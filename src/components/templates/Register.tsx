import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'

import { RegisterForm } from '../organisms/RegisterForm'

interface Props {
    accountId: string
    setAccountId: (value: string) => void
    name: string
    setName: (value: string) => void
    password: string
    setPassword: (value: string) => void
    passwordConfirmation: string
    setPasswordConfirmation: (value: string) => void
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
    passwordConfirmation,
    setPasswordConfirmation,
    register,
}) => {
    const classes = useStyles()

    return (
        <Paper elevation={3} className={classes.paper}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Typography variant="h5" className={classes.subtitle}>
                    本登録
                </Typography>
                <RegisterForm
                    accountId={accountId}
                    setAccountId={setAccountId}
                    name={name}
                    setName={setName}
                    password={password}
                    setPassword={setPassword}
                    passwordConfirmation={passwordConfirmation}
                    setPasswordConfirmation={setPasswordConfirmation}
                    register={register}
                />
            </Grid>
        </Paper>
    )
}
