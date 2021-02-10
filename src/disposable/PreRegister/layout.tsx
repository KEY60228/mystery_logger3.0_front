import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, OutlinedInput, Divider, Button } from '@material-ui/core'

import { Footer } from '../../reusable/Footer'

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            margin: '24px 20px',
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
        formInput: {
            padding: '0.4em 8px',
            '&::placeholder': {
                fontSize: '14px',
            },
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

export const PreRegisterTemplate: FC = () => {
    const classes = useStyles()

    return (
        <>
            <Box className={classes.root}>
                <p className={classes.loginLabel}>アカウントをお持ちの方はこちらから</p>
                <Button variant='contained' color='primary' classes={{root: classes.loginButton, label: classes.loginButtonLabel}}>
                    ログイン
                </Button>
                <Divider className={classes.divider} />
                <p className={classes.title}>メールアドレスで登録</p>
                <Divider className={classes.titleDivider} />
                <OutlinedInput
                    color='primary'
                    placeholder='メールアドレス'
                    classes={{root: classes.form, input: classes.formInput}}
                />
                <Button variant='contained' color='primary' classes={{root: classes.registerButton, label: classes.registerButtonLabel}}>
                    登録する
                </Button>
            </Box>
            <Footer />
        </>
    )
}
