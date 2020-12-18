import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid, Typography, Button, FormControl, InputLabel, Input, FormHelperText, } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../stores'
import { setMessage } from '../../../stores/error'

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
        form: {
            width: '300px',
            margin: '12px auto',
        },
        button: {
            margin: '24px',
        },
    }),
)

export const PreRegisterForm: FC<Props> = props => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const message = useSelector((state: RootState) => state.error.message)

    const onClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault()
        props.preRegister()
    }

    const validateEmail = (email: string) => {
        props.setEmail(email)
        if (!email) {
            dispatch(setMessage({errors: {email: 'メールアドレスは必須です'}}))
            return
        }
        const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
        if (!regex.test(email)) {
            dispatch(setMessage({errors: {email: '正しい形式でメールアドレスを入力してください'}}))
            return
        }
        dispatch(setMessage(null))
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
                        <FormControl className={classes.form}>
                            <InputLabel htmlFor='Email'>Email</InputLabel>
                            <Input
                                id='Email'
                                aria-describedby={'Email-helper'}
                                value={props.email}
                                onChange={ev => validateEmail(ev.target.value)}
                            />
                            { message?.errors?.email &&
                                <FormHelperText id={'Email-helper'}>
                                    {message.errors.email}
                                </FormHelperText>
                            }
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={message !== null}
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
