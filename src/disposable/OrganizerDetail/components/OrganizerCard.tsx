import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, CardMedia, Grid, Typography } from '@material-ui/core'

import { OrganizerDetail } from '../../../@types'

interface Props {
    organizer: OrganizerDetail
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
            padding: '8px',
        },
        img: {
            minWidth: '300px',
            height: '180px',
            backgroundSize: 'contain',
            margin: '8px auto',
        },
        title: {},
        company: {
            color: 'grey',
            fontSize: '12px',
            marginLeft: '12px',
        },
    }),
)

export const OrganizerCard: FC<Props> = props => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <Grid container direction="column" alignItems="center">
                <CardMedia
                    image={`${process.env.API_BASEURL}${props.organizer.image_name}`} // 仮
                    className={classes.img}
                />
                <Typography>{props.organizer.service_name}</Typography>
                {props.organizer.company_name && (
                    <Typography>
                        produced by <a href={`${props.organizer.website}`}>{`${props.organizer.company_name}`}</a>
                    </Typography>
                )}
            </Grid>
        </Card>
    )
}
