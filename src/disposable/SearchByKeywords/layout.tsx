import React, { FC } from 'react'
import { useHistory } from 'react-router'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider, Grid } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import { SearchBox } from '../../reusable/SearchBox'
import { Footer } from '../../reusable/Footer'
import { headerHeight, footerHeight } from '../../util'
import { DisplayAdsCard } from '../../reusable/DisplayAdsCard'

interface Props {
    keywords: string
    setKeywords: React.Dispatch<React.SetStateAction<string>>
}

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
        tran: {
            '&:hover': {
                cursor: 'pointer',
            },
        },
        categoryDivider: {
            margin: '0 0 24px',
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

export const SearchByKeywordsTemplate: FC<Props> = props => {
    const classes = useStyles()
    const history = useHistory()

    return (
        <>
            <Box className={classes.root}>
                <Box className={classes.upperBox}>
                    <p className={classes.title}>キーワードから探す</p>
                    <Divider className={classes.titleDivider} />
                    <SearchBox
                        keywords={props.keywords}
                        setKeywords={props.setKeywords}
                        className={{margin: '0 0 40px', padding: '0 8px', height: '36px', fontSize: '14px'}}
                    />
                </Box>
                <Divider className={classes.categoryDivider} />
                <Box className={classes.bottomBox}>
                    <p className={classes.subtitle}>他から探す</p>
                    <Divider className={classes.titleDivider} />
                    <Box onClick={() => history.push('/search/rankings')} className={classes.tran}>
                        <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                            <p className={classes.label}>ランキングから探す</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box onClick={() => history.push('/search/organizers')} className={classes.tran}>
                        <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                            <p className={classes.label}>主催団体から探す</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box onClick={() => history.push('/search/venues')} className={classes.tran}>
                        <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                            <p className={classes.label}>開催場所から探す</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box onClick={() => history.push('/search/categories')} className={classes.tran}>
                        <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                            <p className={classes.label}>カテゴリーから探す</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                </Box>
                <DisplayAdsCard />
            </Box>
            <Footer />
        </>
    )
}