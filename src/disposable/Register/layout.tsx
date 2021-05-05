import React, { FC, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { OutlinedInput, Box, Button, Divider, FormControl, FormHelperText, InputAdornment, IconButton } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

import { RegisterData } from '../../@types'
import { Footer } from '../../reusable/Footer'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../stores'
import { setMessage } from '../../stores/error'
import { LinearLoader } from '../../handlers/Loader/LinearLoader'

interface Props {
    registerData: RegisterData
    setRegisterData: React.Dispatch<React.SetStateAction<RegisterData>>
    register: () => void
}

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            margin: '24px 20px',
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
        attention: {
            margin: '40px auto 24px',
            lineHeight: '16px',
            fontSize: '12px',
            width: '272px',
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    })
)

export const RegisterTemplate: FC<Props> = props => {
    const classes = useStyles()
    const dispatch = useAppDispatch()

    const loading = useSelector((state: RootState) => state.error.loading)
    const message = useSelector((state: RootState) => state.error.message)

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const validateAccountId = (accountId: string) => {
        props.setRegisterData((prev: RegisterData) => ({...prev, accountId: accountId}))

        if (!accountId) {
            if (message) {
                const errors = Object.assign({}, message.errors, {
                    account_id: 'Account IDは必須です',
                })
                dispatch(setMessage({ errors: errors }))
            } else {
                dispatch(
                    setMessage({
                        errors: { account_id: 'Account IDは必須です' },
                    }),
                )
            }
            return
        }
        const regex = /^[0-9a-zA-Z]+$/
        if (!regex.test(accountId)) {
            if (message) {
                const errors = Object.assign({}, message.errors, {
                    account_id: 'Account IDは半角英数字で入力してください',
                })
                dispatch(setMessage({ errors: errors }))
            } else {
                dispatch(
                    setMessage({
                        errors: {
                            account_id:
                                'Account IDは半角英数字で入力してください',
                        },
                    }),
                )
            }
            return
        }
        if (message) {
            const errors = Object.assign({}, message.errors, {
                account_id: null
            })
            dispatch(setMessage({ errors: errors }))
        } else {
            dispatch(setMessage(null))
        }
    }

    const validateName = (name: string) => {
        props.setRegisterData((prev: RegisterData) => ({...prev, name: name}))

        if (!name) {
            if (message) {
                const errors = Object.assign({}, message.errors, {
                    name: 'Nameは必須です',
                })
                dispatch(setMessage({ errors: errors }))
            } else {
                dispatch(setMessage({ errors: { name: 'Nameは必須です' } }))
            }
            return
        }
        if (message) {
            const errors = Object.assign({}, message.errors, { name: null })
            dispatch(setMessage({ errors: errors }))
        } else {
            dispatch(setMessage(null))
        }
    }

    const validatePassword = (password: string) => {
        props.setRegisterData((prev: RegisterData) => ({...prev, password: password}))

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
        const regex = /^([a-zA-Z0-9]{8,})$/
        if (!regex.test(password)) {
            if (message) {
                const errors = Object.assign({}, message.errors, {
                    password:
                        'Passwordは8文字以上の半角英数字で入力してください',
                })
                dispatch(setMessage({ errors: errors }))
            } else {
                dispatch(
                    setMessage({
                        errors: {
                            password:
                                'Passwordは8文字以上の半角英数字で入力してください',
                        },
                    }),
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

    const handleAccountId = (ev: React.ChangeEvent<{value: string}>) => {
        ev.persist()
        validateAccountId(ev.target.value)
    }

    const handleName = (ev: React.ChangeEvent<{value: string}>) => {
        ev.persist()
        validateName(ev.target.value)
    }

    const handlePassword = (ev: React.ChangeEvent<{value: string}>) => {
        ev.persist()
        validatePassword(ev.target.value)
    }

    const clickRegister = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault()
        props.register()
    }

    return (
        <>
            {loading && <LinearLoader />}
            <Box className={classes.root}>
                <p className={classes.title}>新規登録</p>
                <Divider className={classes.titleDivider} />
                <form>
                    <FormControl className={classes.form}>
                        <OutlinedInput
                            id='Name'
                            aria-describedby={'Name-helper'}
                            color='primary'
                            placeholder='ニックネーム'
                            value={props.registerData.name}
                            onChange={handleName}
                            classes={{root: classes.formInputRoot, input: classes.formInput}}
                        />
                        {message?.errors?.name && (
                            <FormHelperText id={'Name-helper'} className={classes.helper}>
                                {message.errors.name}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl className={classes.form}>
                        <OutlinedInput
                            id='accountId'
                            aria-describedby={'accountId-helper'}
                            color='primary'
                            placeholder='ユーザーID'
                            value={props.registerData.accountId}
                            onChange={handleAccountId}
                            classes={{root: classes.formInputRoot, input: classes.formInput}}
                        />
                        {message?.errors?.account_id && (
                            <FormHelperText id={'accountId-helper'} className={classes.helper}>
                                {message.errors.account_id}
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
                            value={props.registerData.password}
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
                    <p className={classes.attention}>
                        ご登録の前に必ず
                        <span className={classes.link}>利用規約</span>、
                        <span className={classes.link}>コミュニティガイドライン</span>、
                        <span className={classes.link}>プライバシーポリシー</span>
                        をご確認ください
                    </p>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={
                            !!message?.errors?.name ||
                            !!message?.errors?.account_id ||
                            !!message?.errors?.password
                        }
                        onClick={clickRegister}
                        classes={{root: classes.loginButton, label: classes.loginButtonLabel}}
                    >
                        登録する
                    </Button>
                </form>
            </Box>
            <Footer />
        </>
    )
}