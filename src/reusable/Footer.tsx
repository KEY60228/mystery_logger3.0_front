import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Grid } from '@material-ui/core'

const useStyles = makeStyles(() => 
    createStyles({
        root: {
            backgroundColor: '#0A0A0A',
            height: '168px',
            marginTop: '40px',
            paddingTop: '24px',
        },
        guide: {
            marginBottom: '8px',
        },
        guideText: {
            color: '#FFAC00',
            lineHeight: '16px',
            fontSize: '12px',
            margin: '0 8px',
        },
        titleLogo: {
            height: '40px',
            margin: '16px auto 8px',
            paddingRight: '8px',
            backgroundColor: '#FEFEFE',
            verticalAlign: 'top',
            display: 'block',
        },
    })
)

export const Footer: FC = () => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Grid container justify="center" alignItems="center" className={classes.guide}>
                <p className={classes.guideText}>利用規約</p>
                <p className={classes.guideText}>コミュニティガイドライン</p>
            </Grid>
            <Grid container justify="center" alignItems="center" className={classes.guide}>
                <p className={classes.guideText}>プライバシーポリシー</p>
                <p className={classes.guideText}>運営団体</p>
                <p className={classes.guideText}>お問い合わせ</p>
            </Grid>
            <img
                src={'/img/TitleLogo.png'}
                className={classes.titleLogo}
            />
            <Grid container direction="column" justify="center" alignItems="center">
                <p className={classes.guideText}>Copyright 2021 @key60228</p>
                <p className={classes.guideText}>All Rights Reserved.</p>
            </Grid>
        </Box>
    )
}