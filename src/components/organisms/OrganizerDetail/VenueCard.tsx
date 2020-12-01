import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Typography, Grid } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import { Venue } from '../../../@types'
import { useHistory } from 'react-router'

interface Props {
    venue: Venue
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px 16px',
            padding: '8px',
        },
    })
)

export const VenueCard: FC<Props> = (props) => {
    const classes = useStyles()
    const history = useHistory()

    const onClick = () => {
        history.push(`/venues/${props.venue.id}`)
    }

    return (
        <Card className={classes.root} onClick={onClick}>
            <Grid container wrap="nowrap" justify="space-between">
                <Grid container direction="column">
                    <Typography>
                        {props.venue.name}
                    </Typography>
                    <Typography>
                        {props.venue.address}
                    </Typography>
                </Grid>
                <NavigateNextIcon />
            </Grid>
        </Card>
    )
}
