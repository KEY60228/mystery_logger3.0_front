import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'

import { LoginForm } from '../organisms/LoginForm'

interface Props {
    email: string
    setEmail: (value: string) => void
    password: string
    setPassword: (value: string) => void
    login: () => void
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

export const Login: FC<Props> = ({
    email,
    setEmail,
    password,
    setPassword,
    login,
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
                    ログイン
                </Typography>
                <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    login={login}
                />
            </Grid>
        </Paper>
    )
}
