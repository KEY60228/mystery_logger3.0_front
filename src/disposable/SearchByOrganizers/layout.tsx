import React, { FC } from 'react'
import { useHistory } from 'react-router'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider, Grid } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import { Footer } from '../../reusable/Footer'
import { headerHeight, footerHeight } from '../../util'

interface Props {
    organizers: Prop[]
}

interface Prop {
    id: number
    service_name: string
    company_name: string
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            minHeight: `calc(100vh - ${headerHeight} - ${footerHeight})`,
        },
        upperBox: {
            margin: '16px 20px 0',
        },
        serviceLabel: {
            lineHeight: '24px',
            fontSize: '16px',
            margin: '16px 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        companyLabel: {
            fontSize: '14px',
            color: '#C0C0C0',
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

export const SearchByOrganizersTemplate: FC<Props> = props => {
    const classes = useStyles()
    const history = useHistory()

    return (
        <>
            <Box className={classes.root}>
                <Box className={classes.upperBox}>
                    <p className={classes.title}>主催団体から探す</p>
                    <Divider className={classes.titleDivider} />
                    { props.organizers.map(organizer => (
                        <Box key={organizer.id}>
                            <Grid
                                container
                                justify='space-between'
                                alignItems='center'
                                wrap='nowrap'
                                onClick={() => history.push(`/search?organizer=${organizer.id}`)}
                            >
                                <p className={classes.serviceLabel}>
                                    {organizer.service_name}
                                    {organizer.company_name &&
                                        <span className={classes.companyLabel}> / {organizer.company_name}</span>
                                    }
                                </p>
                                <NavigateNextIcon />
                            </Grid>
                            <Divider />
                        </Box>
                    ))}
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
                    <Box onClick={() => history.push('/search/venues')}>
                        <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                            <p className={classes.label}>開催場所から探す</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box onClick={() => history.push('/search/categories')}>
                        <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                            <p className={classes.label}>カテゴリーから探す</p>
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