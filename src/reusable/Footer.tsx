import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Grid } from '@material-ui/core'

import { footerHeight } from '../util'

const useStyles = makeStyles(() => 
    createStyles({
        root: {
            backgroundColor: '#0A0A0A',
            height: footerHeight,
            marginTop: '40px',
            paddingTop: '40px',
        },
        guideText: {
            color: '#FFAC00',
            lineHeight: '16px',
            fontSize: '12px',
            margin: '0 8px 16px',
            textDecoration: 'none',
        },
        titleLogo: {
            height: '40px',
            margin: '16px auto',
            paddingRight: '8px',
            backgroundColor: '#FEFEFE',
            verticalAlign: 'top',
            display: 'block',
        },
        copyright: {
            color: '#FFAC00',
            lineHeight: '16px',
            fontSize: '12px',
            textDecoration: 'none',
            margin: '4px 0',
        },
    })
)

export const Footer: FC = () => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Grid container justify="center" alignItems="center">
                <Link to="/kiyaku" className={classes.guideText}>利用規約</Link>
                <Link to="/guideline" className={classes.guideText}>コミュニティガイドライン</Link>
            </Grid>
            <Grid container justify="center" alignItems="center">
                <Link to="/policy" className={classes.guideText}>プライバシーポリシー</Link>
                <Link to="/about" className={classes.guideText}>なぞログについて</Link>
                <Link to="/contact" className={classes.guideText}>お問い合わせ</Link>
            </Grid>
            <img
                src={'/img/TitleLogo.png'}
                className={classes.titleLogo}
            />
            <Grid container direction="column" justify="center" alignItems="center">
                <p className={classes.copyright}>Copyright 2021 @key60228</p>
                <p className={classes.copyright}>All Rights Reserved.</p>
            </Grid>
        </Box>
    )
}