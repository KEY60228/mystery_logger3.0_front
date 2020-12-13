import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid, Typography, Button } from '@material-ui/core'

import { Form } from '../../molecules/Form'

interface Props {
    email: string
    setEmail: (value: string) => void
    preRegister: () => void
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

export const PreRegisterForm: FC<Props> = props => {
    const classes = useStyles()

    const onClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault()
        props.preRegister()
    }

    return (
        <Card className={classes.root}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Typography variant="h5" className={classes.subtitle}>
                    会員登録
                </Typography>
                <form>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Form
                            label="Email"
                            value={props.email}
                            setValue={props.setEmail}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={onClick}
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
