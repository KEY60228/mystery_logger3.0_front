import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Button } from '@material-ui/core'

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

export const NotFoundPage: FC = () => {
    const classes = useStyles()
    const history = useHistory()

    return (
        <>
            <Box className={classes.root}>
                <p className={classes.text} data-testid='failed'>ページが見つかりません</p>
                <Button variant='contained' color='primary' onClick={() => history.push('/')} className={classes.button}>
                    トップページに戻る
                </Button>
            </Box>
            <Footer />
        </>
    )
}
