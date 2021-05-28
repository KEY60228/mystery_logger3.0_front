import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import { Footer } from '../../reusable/Footer'
import { headerHeight, footerHeight } from '../../util'

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            margin: '8px',
            minHeight: `calc(100vh - ${headerHeight} - ${footerHeight} - 16px)`,
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
        button: {
            display: 'block',
            margin: '16px auto',
        },
    }),
)

export const SystemErrorPage: FC = () => {
    const classes = useStyles()

    return (
        <>
            <Box className={classes.root}>
                <p className={classes.text}>システムエラーが発生しました</p>
                <p className={classes.text}>ご迷惑おかけしますが、復旧まで少々お待ちください</p>
            </Box>
            <Footer />
        </>
    )
}
