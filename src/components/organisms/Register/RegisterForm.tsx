import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid, Typography, Button } from '@material-ui/core'

import { Form } from '../../molecules/Form'
import { PasswordForm } from '../../molecules/PasswordForm'

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

export const RegisterForm: FC<Props> = props => {
    const classes = useStyles()

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
                            label="Account ID"
                            value={props.accountId}
                            setValue={props.setAccountId}
                        />
                        <Form
                            label="Name"
                            value={props.name}
                            setValue={props.setName}
                        />
                        <PasswordForm
                            password={props.password}
                            setPassword={props.setPassword}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={props.register}
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
