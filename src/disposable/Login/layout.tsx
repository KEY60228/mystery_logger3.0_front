import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { OutlinedInput, Box, Button, Divider, FormControl, InputAdornment, IconButton, FormHelperText } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { LoginData } from '../../@types'
import { Footer } from '../../reusable/Footer'
import { RootState, useAppDispatch } from '../../stores'
import { useSelector } from 'react-redux'
import { setMessage } from '../../stores/error'
import { LinearLoader } from '../../handlers/Loader/LinearLoader'
import { footerHeight, headerHeight } from '../../util'

interface Props {
    login: () => void
    loginData: LoginData
    setLoginData: React.Dispatch<React.SetStateAction<LoginData>>
}

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            margin: '24px 20px 40px',
            minHeight: `calc(100vh - ${headerHeight} - ${footerHeight} - 64px)`,
        },
        registerLabel: {
            margin: '0',
            lineHeight: '16px',
            fontSize: '12px',
            textAlign: 'center',
        },
        registerButton: {
            margin: '16px auto',
            width: '256px',
            height: '40px',
            padding: '0',
            display: 'block',
            borderRadius: '10px',
        },
        registerButtonLabel: {
            lineHeight: '24px',
            fontSize: '16px',
            fontWeight: 'bold',
        },
        divider: {
            margin: '24px 0 16px',
        },
        title: {
            lineHeight: '32px',
            fontSize: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        titleDivider: {
            margin: '16px auto 24px',
            width: '160px',
        },
        form: {
            width: '272px',
            height: '32px',
            margin: '0 auto 24px',
            display: 'block',
        },
        formInputRoot: {
            width: '100%',
        },
        formInput: {
            padding: '0.4em 0 0.4em 8px',
            '&::placeholder': {
                fontSize: '14px',
            },
        },
        helper: {
            color: theme.palette.error.main,
            lineHeight: '16px',
            fontSize: '12px',
        },
        iconButton: {
            width: '30px',
            height: '30px',
            padding: '0',
        },
        loginButton: {
            width: '256px',
            height: '40px',
            margin: '0 auto',
            padding: '0',
            borderRadius: '10px',
            display: 'block',
        },
        loginButtonLabel: {
            lineHeight: '24px',
            fontSize: '16px',
            fontWeight: 'bold',
        },
        forgotten: {
            margin: '16px 0 0',
            textAlign: 'center',
            lineHeight: '16px',
            fontSize: '12px',
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    })
)

export const LoginTemplate: FC<Props> = props => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useAppDispatch()

    const message = useSelector((state: RootState) => state.error.message)
    const loading = useSelector((state: RootState) => state.error.loading)

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const validateEmail = (email: string) => {
        props.setLoginData((prev: LoginData) => ({...prev, email: email}))
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
        props.setLoginData((prev: LoginData) => ({...prev, password: password}))
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

    const handleEmail = (ev: React.ChangeEvent<{value: string}>) => {
        ev.persist()
        validateEmail(ev.target.value)
    }

    const handlePassword = (ev: React.ChangeEvent<{value: string}>) => {
        ev.persist()
        validatePassword(ev.target.value)
    }

    const clickLogin = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault()
        props.login()
    }

    return (
        <>
            {loading && <LinearLoader />}
            <Box className={classes.root}>
                <p className={classes.registerLabel}>アカウントをお持ちでない方はこちら</p>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => history.push('/preregister')}
                    classes={{root: classes.registerButton, label: classes.registerButtonLabel}}
                >
                    会員登録
                </Button>
                <Divider className={classes.divider} />
                <p className={classes.title}>ログイン</p>
                <Divider className={classes.titleDivider} />
                <form>
                    <FormControl className={classes.form}>
                        <OutlinedInput
                            id='Email'
                            aria-describedby={'Email-helper'}
                            color='primary'
                            placeholder='メールアドレス'
                            value={props.loginData.email}
                            onChange={handleEmail}
                            classes={{root: classes.formInputRoot, input: classes.formInput}}
                        />
                        {message?.errors?.email && (
                            <FormHelperText id={'Email-helper'} className={classes.helper}>
                                {message.errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl className={classes.form}>
                        <OutlinedInput
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            aria-describedby={`password-helper`}
                            color='primary'
                            placeholder='パスワード'
                            value={props.loginData.password}
                            onChange={handlePassword}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={classes.iconButton}
                                    >
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            classes={{root: classes.formInputRoot, input: classes.formInput}}
                        />
                        {message?.errors?.password && (
                            <FormHelperText id={`password-helper`} className={classes.helper}>
                                {message.errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={
                            !!message?.errors?.email ||
                            !!message?.errors?.password
                        }
                        onClick={clickLogin}
                        classes={{root: classes.loginButton, label: classes.loginButtonLabel}}
                    >
                        ログイン
                    </Button>
                </form>
                <p className={classes.forgotten}>パスワードを忘れてしまった方</p>
            </Box>
            <Footer />
        </>
    )
}