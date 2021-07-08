import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import { Footer } from '../../reusable/Footer'
import { headerHeight, footerHeight } from '../../util'

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            margin: '8px auto',
            minHeight: `calc(100vh - ${headerHeight} - ${footerHeight} - 16px)`,
            maxWidth: '600px',
        },
        innerBox: {
            margin: '8px',
        },
        text: {
            margin: '0',
            fontSize: '14px',
            lineHeight: '24px',
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    })
)

export const VerifyFailedTemplate: FC = () => {
    const classes = useStyles()
    const history = useHistory()

    return (
        <>
            <Box className={classes.root}>
                <Box className={classes.innerBox}>
                    <p className={classes.text} data-testid='failed'>認証に失敗しました</p>
                    <p className={classes.text}>
                        お手数ですが、再度<span onClick={() => history.push('/preregister')} className={classes.link}>こちら</span>から会員登録をお願いします
                    </p>
                </Box>
            </Box>
            <Footer />
        </>
    )
}
