import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { OutlinedInput, Box, Grid, Button, Divider } from '@material-ui/core'

import { Footer } from '../../reusable/Footer'

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
        formInput: {
            padding: '0.4em 8px',
            '&::placeholder': {
                fontSize: '14px',

            },
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

export const LoginTemplate: FC = () => {
    const classes = useStyles()
    
    return (
        <>
            <Box className={classes.root}>
                <p className={classes.registerLabel}>アカウントをお持ちでない方はこちら</p>
                <Button variant='contained' color='primary' classes={{root: classes.registerButton, label: classes.registerButtonLabel}}>
                    会員登録
                </Button>
                <Divider className={classes.divider} />
                <p className={classes.title}>ログイン</p>
                <Divider className={classes.titleDivider} />
                <OutlinedInput
                    color='primary'
                    placeholder='メールアドレス'
                    classes={{root: classes.form, input: classes.formInput}}
                />
                <OutlinedInput
                    color='primary'
                    placeholder='パスワード'
                    classes={{root: classes.form, input: classes.formInput}}
                />
                <Button variant='contained' color='primary' classes={{root: classes.loginButton, label: classes.loginButtonLabel}}>
                    ログイン
                </Button>
                <p className={classes.forgotten}>パスワードを忘れてしまった方</p>
            </Box>
            <Footer />
        </>
    )
}