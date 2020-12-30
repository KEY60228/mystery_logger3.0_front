import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
    Card,
    Grid,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    InputAdornment,
    IconButton,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { setMessage } from '../../../stores/error'
import { RootState, useAppDispatch } from '../../../stores'
import { useSelector } from 'react-redux'

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

export const LoginForm: FC<Props> = props => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const message = useSelector((state: RootState) => state.error.message)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const validateEmail = (email: string) => {
        props.setEmail(email)
        if (!email) {
            if (message) {
                const errors = Object.assign({}, message.errors, {
                    email: 'メールアドレスは必須です',
                })
                dispatch(setMessage({ errors: errors }))
            } else {
                dispatch(
                    setMessage({
                        errors: { email: 'メールアドレスは必須です' },
                    }),
                )
            }
            return
        }
        if (message) {
            const errors = Object.assign({}, message.errors, { email: null })
            dispatch(setMessage({ errors: errors }))
        } else {
            dispatch(setMessage(null))
        }
    }

    const validatePassword = (password: string) => {
        props.setPassword(password)
        if (!password) {
            if (message) {
                const errors = Object.assign({}, message.errors, {
                    password: 'Passwordは必須です',
                })
                dispatch(setMessage({ errors: errors }))
            } else {
                dispatch(
                    setMessage({ errors: { password: 'Passwordは必須です' } }),
                )
            }
            return
        }
        if (message) {
            const errors = Object.assign({}, message.errors, { password: null })
            dispatch(setMessage({ errors: errors }))
        } else {
            dispatch(setMessage(null))
        }
    }

    const onClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault()
        props.login()
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
                    ログイン
                </Typography>
                <form>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <FormControl className={classes.form}>
                            <InputLabel htmlFor="Email">Email</InputLabel>
                            <Input
                                id="Email"
                                aria-describedby={'Email-helper'}
                                value={props.email}
                                error={!!message?.errors?.email}
                                onChange={ev => validateEmail(ev.target.value)}
                            />
                            {message?.errors?.email && (
                                <FormHelperText id={'Email-helper'}>
                                    {message.errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl className={classes.form}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                aria-describedby={`password-helper`}
                                value={props.password}
                                error={!!message?.errors?.password}
                                onChange={ev =>
                                    validatePassword(ev.target.value)
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {message?.errors?.password && (
                                <FormHelperText id={`password-helper`}>
                                    {message.errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={
                                !!message?.errors?.email ||
                                !!message?.errors?.password
                            }
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
