import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'

import { PreRegisterForm } from '../organisms/PreRegisterForm'
import { PreRegisterModal } from '../organisms/PreRegisterModal'

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
            <Paper elevation={3} className={classes.paper}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Typography variant="h5" className={classes.subtitle}>
                        会員登録
                    </Typography>
                    <PreRegisterForm
                        email={email}
                        setEmail={setEmail}
                        preRegister={preRegister}
                    />
                </Grid>
            </Paper>
            <PreRegisterModal
                open={open}
                setOpen={setOpen}
                setEmail={setEmail}
            />
        </>
    )
}
