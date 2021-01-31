import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Typography, Grid } from '@material-ui/core'

import { VenueDetail } from '../../../@types'

interface Props {
    venue: VenueDetail
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
            padding: '8px',
        },
        name: {
            fontSize: '18px',
        },
        organizer: {
            fontSize: '16px',
            color: 'grey',
        },
        tel: {
            fontSize: '14px',
        },
        address: {
            fontSize: '14px',
        },
    }),
)

export const VenueContents: FC<Props> = props => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <Typography className={classes.name}>{props.venue.name}</Typography>
            <Grid container justify="flex-end">
                <Typography className={classes.organizer}>
                    {props.venue.organizer.service_name}
                </Typography>
            </Grid>
            {props.venue.zipcode && (
                <Typography className={classes.address}>
                    {`〒${props.venue.zipcode}`}
                </Typography>
            )}
            <Typography className={classes.address}>
                {props.venue.addr_prefecture}
                {props.venue.addr_city}
                {props.venue.addr_block}
                {props.venue.addr_building}
            </Typography>
            <Typography className={classes.tel}>{props.venue.tel}</Typography>
        </Card>
    )
}
