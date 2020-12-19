import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid, Typography, Button, FormControl, InputLabel, Input, FormHelperText, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { RootState, useAppDispatch } from '../../../stores'
import { useSelector } from 'react-redux'
import { setMessage } from '../../../stores/error'

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
        form: {
            width: '300px',
            margin: '12px auto',
        },
        button: {
            margin: '24px',
        },
    }),
)

export const RegisterForm: FC<Props> = props => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const message = useSelector((state: RootState) => state.error.message)

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const validateAccountId = (accountId: string) => {
        props.setAccountId(accountId)
        
        if (!accountId) {
            if (message) {
                const errors = Object.assign({}, message.errors, {account_id: 'Account IDは必須です'})
                dispatch(setMessage({errors: errors}))
            } else {
                dispatch(setMessage({errors: {account_id: 'Account IDは必須です'}}))
            }
            return
        }
        const regex = /^[0-9a-zA-Z]+$/
        if (!regex.test(accountId)) {
            if (message) {
                const errors = Object.assign({}, message.errors, {account_id: 'Account IDは半角英数字で入力してください'})
                dispatch(setMessage({errors: errors}))
            } else {
                dispatch(setMessage({errors: {account_id: 'Account IDは半角英数字で入力してください'}}))
            }
            return
        }
        if (message) {
            const errors = Object.assign({}, message.errors, {account_id: null})
            dispatch(setMessage(errors))
        } else {
            dispatch(setMessage(null))
        }
    }

    const validateName = (name: string) => {
        props.setName(name)
        if (!name) {
            if (message) {
                const errors = Object.assign({}, message.errors, {name: 'Nameは必須です'})
                dispatch(setMessage({errors: errors}))
            } else {
                dispatch(setMessage({errors: {name: 'Nameは必須です'}}))
            }
            return
        }
        if (message) {
            const errors = Object.assign({}, message.errors, {name: null})
            dispatch(setMessage({errors: errors}))
        } else {
            dispatch(setMessage(null))
        }
    }

    const validatePassword = (password: string) => {
        props.setPassword(password)
        if (!password) {
            if (message) {
                const errors = Object.assign({}, message.errors, {password: 'Passwordは必須です'})
                dispatch(setMessage({errors: errors}))
            } else {
                dispatch(setMessage({errors: {password: 'Passwordは必須です'}}))
            }
            return
        }
        const regex = /^([a-zA-Z0-9]{8,})$/
        if (!regex.test(password)) {
            if (message) {
                const errors = Object.assign({}, message.errors, {password: 'Passwordは8文字以上の半角英数字で入力してください'})
                dispatch(setMessage({errors: errors}))
            } else {
                dispatch(setMessage({errors: {password: 'Passwordは8文字以上の半角英数字で入力してください'}}))
            }
            return
        }
        if (message) {
            const errors = Object.assign({}, message.errors, {password: null})
            dispatch(setMessage({errors: errors}))
        } else {
            dispatch(setMessage(null))
        }
    }

    const onClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault()
        props.register()
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
                    本登録
                </Typography>
                <form>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <FormControl className={classes.form}>
                            <InputLabel htmlFor='account_id'>Account ID</InputLabel>
                            <Input
                                id='account_id'
                                aria-describedby={'account_id-helper'}
                                value={props.accountId}
                                error={!!message?.errors?.account_id}
                                onChange={ev => validateAccountId(ev.target.value)}
                            />
                            { message?.errors?.account_id &&
                                <FormHelperText id={'account_id-helper'}>
                                    {message.errors.account_id}
                                </FormHelperText>
                            }
                        </FormControl>
                        <FormControl className={classes.form}>
                            <InputLabel htmlFor='name'>Name</InputLabel>
                            <Input
                                id='name'
                                aria-describedby={'name-helper'}
                                value={props.name}
                                error={!!message?.errors?.name}
                                onChange={ev => validateName(ev.target.value)}
                            />
                            { message?.errors?.name &&
                                <FormHelperText id={'name-helper'}>
                                    {message.errors.name}
                                </FormHelperText>
                            }
                        </FormControl>
                        <FormControl className={classes.form}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                aria-describedby={`password-helper`}
                                value={props.password}
                                error={!!message?.errors?.password}
                                onChange={ev => validatePassword(ev.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            { message?.errors?.password &&
                                <FormHelperText id={`password-helper`}>
                                    {message.errors.password}
                                </FormHelperText>
                            }
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!!message?.errors?.account_id || !!message?.errors?.name || !!message?.errors?.password}
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
