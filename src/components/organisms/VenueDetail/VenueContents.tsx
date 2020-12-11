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
            fontSize: '14px'
        },
        address: {
            fontSize: '14px',
        },
    })
)

export const VenueContents: FC<Props> = props => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <Typography className={classes.name}>
                {props.venue.name}
                {/* アジトオブスクラップ東新宿GUNKAN */}
            </Typography>
            <Grid container justify='flex-end'>
                <Typography className={classes.organizer}>
                    {props.venue.organizer.service_name}
                    {/* by 株式会社SCRUP */}
                </Typography>
            </Grid>
            <Typography className={classes.address}>
                〒{props.venue.zipcode}
                {/* 〒169-0072 */}
            </Typography>
            <Typography className={classes.address}>
                {props.venue.addr_prefecture}
                {props.venue.addr_city}
                {props.venue.addr_block}
                {props.venue.addr_building}
                {/* 東京都新宿区大久保1-1-10 GUNKAN東新宿 302 */}
            </Typography>
            <Typography className={classes.tel}>
                {props.venue.tel}
                {/* TEL: 03-6233-9868 */}
            </Typography>
        </Card>
    )
}

// 会場名、電話番号、住所、Google Map API、所有者名
