import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid, Typography, Button } from '@material-ui/core'

import { Form } from '../molecules/Form'
import { PasswordForm } from '../molecules/PasswordForm'

interface Props {
    accountId: string
    setAccountId: (value: string) => void
    name: string
    setName: (value: string) => void
    password: string
    setPassword: (value: string) => void
    register: () => void
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
            margin: '24px'
        }
    })
)

export const RegisterForm: FC<Props> = ({
    accountId,
    setAccountId,
    name,
    setName,
    password,
    setPassword,
    register,
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
                    本登録
                </Typography>
                <form>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Form
                            label='Account ID'
                            value={accountId}
                            setValue={setAccountId}
                        />
                        <Form
                            label='Name'
                            value={name}
                            setValue={setName}
                        />
                        <PasswordForm
                            password={password}
                            setPassword={setPassword}
                            className={{ width: '300px', margin: '12px auto' }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={register}
                            className={classes.button}
                        >
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Card>
    )
}
