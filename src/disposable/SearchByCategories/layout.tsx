import React, { FC } from 'react'
import { useHistory } from 'react-router'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider, Grid } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import { Footer } from '../../reusable/Footer'
import { headerHeight, footerHeight } from '../../util'

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            minHeight: `calc(100vh - ${headerHeight} - ${footerHeight})`,
            maxWidth: '600px',
            margin: '0 auto',
        },
        upperBox: {
            margin: '16px 20px 0',
        },
        title: {
            lineHeight: '32px',
            fontSize: '20px',
            fontWeight: 'bold',
            margin: '0 0 16px',
            textAlign: 'center',
        },
        titleDivider: {
            width: '160px',
            margin: '0 auto 24px',
        },
        categoryLabel: {
            lineHeight: '24px',
            fontSize: '16px',
            margin: '16px 0',
        },
        categoryDivider: {
            margin: '40px 0 24px',
        },
        bottomBox: {
            margin: '0 20px 24px',
        },
        subtitle: {
            lineHeight: '24px',
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0 0 16px',
            textAlign: 'center',
        },
        label: {
            lineHeight: '16px',
            fontSize: '14px',
            margin: '16px 0',
        },
    })
)

export const SearchByCategoriesTemplate: FC = () => {
    const classes = useStyles()
    const history = useHistory()

    return (
        <>
            <Box className={classes.root}>
                <Box className={classes.upperBox}>
                    <p className={classes.title}>カテゴリーから探す</p>
                    <Divider className={classes.titleDivider} />
                    <Box>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='center'
                            wrap='nowrap'
                            onClick={() => history.push(`/search?category=1`)}
                        >
                            <p className={classes.categoryLabel}>ルームタイプの作品</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='center'
                            wrap='nowrap'
                            onClick={() => history.push(`/search?category=2`)}
                        >
                            <p className={classes.categoryLabel}>ホールタイプの作品</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='center'
                            wrap='nowrap'
                            onClick={() => history.push(`/search?category=3`)}
                        >
                            <p className={classes.categoryLabel}>キット配布タイプの作品</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='center'
                            wrap='nowrap'
                            onClick={() => history.push(`/search?category=4`)}
                        >
                            <p className={classes.categoryLabel}>オンラインの作品</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='center'
                            wrap='nowrap'
                            onClick={() => history.push(`/search?category=5`)}
                        >
                            <p className={classes.categoryLabel}>その他の作品</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                </Box>
                <Divider className={classes.categoryDivider} />
                <Box className={classes.bottomBox}>
                    <p className={classes.subtitle}>他から探す</p>
                    <Divider className={classes.titleDivider} />
                    <Box onClick={() => history.push('/search/keywords')}>
                        <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                            <p className={classes.label}>キーワードから探す</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box onClick={() => history.push('/search/rankings')}>
                        <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                            <p className={classes.label}>ランキングから探す</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box onClick={() => history.push('/search/organizers')}>
                        <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                            <p className={classes.label}>主催団体から探す</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box onClick={() => history.push('/search/venues')}>
                        <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                            <p className={classes.label}>開催場所から探す</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}