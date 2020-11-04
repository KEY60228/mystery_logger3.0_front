import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid, Typography, Button } from '@material-ui/core'

import { Form } from '../molecules/Form'
import { PasswordForm } from '../molecules/PasswordForm'

interface Props {
    email: string
    setEmail: (value: string) => void
    password: string
    setPassword: (value: string) => void
    login: () => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
        },
        subtitle: {
            width: '100%',
            textAlign: 'center',
            borderBottom: '1px groove grey',
            padding: '24px',
        },
        button: {
            margin: '24px',
        },
    }),
)

export const LoginForm: FC<Props> = ({
    email,
    setEmail,
    password,
    setPassword,
    login,
    className,
}) => {
    const classes = useStyles(className)

    return (
        <Card className={classes.root}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Typography variant="h5" className={classes.subtitle}>
                    ログイン
                </Typography>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Form label="Email" value={email} setValue={setEmail} />
                    <PasswordForm
                        password={password}
                        setPassword={setPassword}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={login}
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Card>
    )
}
