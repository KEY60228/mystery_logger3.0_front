import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, OutlinedInput, Divider, Button, FormHelperText, FormControl } from '@material-ui/core'

import { Footer } from '../../reusable/Footer'
import { RootState, useAppDispatch } from '../../stores'
import { LinearLoader } from '../../handlers/Loader/LinearLoader'
import { setMessage } from '../../stores/error'
import { PreRegisteredModal } from './components/PreRegisteredModal'
import { footerHeight, headerHeight } from '../../util'

interface Props {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    preRegister: () => void
}

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            margin: '24px 20px 40px',
            minHeight: `calc(100vh - ${headerHeight} - ${footerHeight} - 64px)`,
        },
        loginLabel: {
            margin: '0',
            lineHeight: '16px',
            fontSize: '12px',
            textAlign: 'center',
        },
        loginButton: {
            margin: '16px auto',
            width: '256px',
            height: '40px',
            padding: '0',
            display: 'block',
            borderRadius: '10px',
        },
        loginButtonLabel: {
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
            padding: '0.4em 8px',
            '&::placeholder': {
                fontSize: '14px',
            },
        },
        helper: {
            color: theme.palette.error.main,
            lineHeight: '16px',
            fontSize: '12px',
        },
        registerButton: {
            width: '256px',
            height: '40px',
            margin: '0 auto',
            padding: '0',
            borderRadius: '10px',
            display: 'block',
        },
        registerButtonLabel: {
            lineHeight: '24px',
            fontSize: '16px',
            fontWeight: 'bold',
        },
    })
)

export const PreRegisterTemplate: FC<Props> = props => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useAppDispatch()

    const loading = useSelector((state: RootState) => state.error.loading)
    const message = useSelector((state: RootState) => state.error.message)

    const validateEmail = (email: string) => {
        props.setEmail(email)
        if (!email) {
            dispatch(
                setMessage({ errors: { email: 'メールアドレスは必須です' } }),
            )
            return
        }
        const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
        if (!regex.test(email)) {
            dispatch(
                setMessage({
                    errors: {
                        email: '正しい形式でメールアドレスを入力してください',
                    },
                }),
            )
            return
        }
        dispatch(setMessage(null))
    }

    const clickPreRegister = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault()
        props.preRegister()
    }

    return (
        <>
            {loading && <LinearLoader />}
            <Box className={classes.root}>
                <p className={classes.loginLabel}>アカウントをお持ちの方はこちらから</p>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => history.push('/login')}
                    classes={{root: classes.loginButton, label: classes.loginButtonLabel}}
                >
                    ログイン
                </Button>
                <Divider className={classes.divider} />
                <p className={classes.title}>メールアドレスで登録</p>
                <Divider className={classes.titleDivider} />
                <form>
                    <FormControl className={classes.form}>
                        <OutlinedInput
                            id='Email'
                            aria-describedby={'Email-helper'}
                            color='primary'
                            placeholder='メールアドレス'
                            value={props.email}
                            onChange={ev => validateEmail(ev.target.value)}
                            classes={{root: classes.formInputRoot, input: classes.formInput}}
                        />
                        {message?.errors?.email && (
                            <FormHelperText id={'Email-helper'} className={classes.helper}>
                                {message.errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={!!message?.errors?.email}
                        onClick={clickPreRegister}
                        classes={{root: classes.registerButton, label: classes.registerButtonLabel}}
                    >
                        登録する
                    </Button>
                </form>
            </Box>
            <Footer />
            <PreRegisteredModal
                open={props.open}
                setOpen={props.setOpen}
                setEmail={props.setEmail}
            />
        </>
    )
}
