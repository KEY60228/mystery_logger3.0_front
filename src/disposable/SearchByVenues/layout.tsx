import React, { FC, useState } from 'react'
import { useHistory } from 'react-router'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider, Grid } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { Footer } from '../../reusable/Footer'
import { headerHeight, footerHeight } from '../../util'

interface Props {
    venues: Prop[][]
}

interface Prop {
    id: number
    name: string
    addr_pref_id: number
    addr_prefecture: string
    service_name: string
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            minHeight: `calc(100vh - ${headerHeight} - ${footerHeight})`,
        },
        upperBox: {
            margin: '16px 20px 0',
        },
        prefLabel: {
            lineHeight: '24px',
            fontSize: '16px',
            margin: '16px 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        venueBox: {
            width: '90%',
            margin: '0 auto',
        },
        venueLabel: {
            lineHeight: '16px',
            fontSize: '14px',
            margin: '16px 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        serviceLabel: {
            fontSize: '12px',
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

export const SearchByVenuesTemplate: FC<Props> = props => {
    const classes = useStyles()
    const history = useHistory()
    const [open, setOpen] = useState<number|false>(false)

    return (
        <>
            <Box className={classes.root}>
                <Box className={classes.upperBox}>
                    <p className={classes.title}>開催場所から探す</p>
                    <Divider className={classes.titleDivider} />
                    { props.venues.map(venues => (
                        <React.Fragment key={venues[0].id}>
                            <Box
                                onClick={() => 
                                    open === venues[0].addr_pref_id ? history.push(`/search?pref=${venues[0].addr_pref_id}`) : setOpen(venues[0].addr_pref_id)
                                }
                            >
                                <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                                    <p className={classes.prefLabel}>
                                        {venues[0].addr_prefecture || 'その他'}
                                    </p>
                                    {open !== venues[0].addr_pref_id &&
                                        <ExpandMoreIcon />
                                    }
                                    {open === venues[0].addr_pref_id &&
                                        <NavigateNextIcon />
                                    }
                                </Grid>
                                <Divider />
                            </Box>
                            {open === venues[0].addr_pref_id && venues.map(venue => (
                                <Box key={venue.id} className={classes.venueBox} onClick={() => history.push(`/search?venue=${venue.id}`)}>
                                    <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                                        <p className={classes.venueLabel}>{venue.name}<span className={classes.serviceLabel}> By {venue.service_name}</span></p>
                                        <NavigateNextIcon />
                                    </Grid>
                                    <Divider />
                                </Box>
                            ))}
                        </React.Fragment>
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
                    <Box onClick={() => history.push('/search/organizers')}>
                        <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                            <p className={classes.label}>主催団体から探す</p>
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