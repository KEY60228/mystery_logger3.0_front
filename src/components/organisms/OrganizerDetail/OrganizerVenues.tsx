import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Typography, Grid } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

import { Venue } from '../../../@types'
import { VenueCard } from './VenueCard'

interface Props {
    venues: Venue[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
        card: {
            margin: '8px',
            padding: '8px',
        },
        text: {

        },
    })
)

export const OrganizerVenues: FC<Props> = (props) => {
    const classes = useStyles()
    const [open, setOpen] = useState<boolean>(false)

    const onClick = () => {
        setOpen(!open)
    }

    return (
        <>
            <Card className={classes.card} onClick={onClick}>
                <Grid container wrap='nowrap' justify='space-between'>
                    <Typography className={classes.text}>会場一覧</Typography>
                    { !open &&
                        <ExpandMoreIcon />
                    }
                    { open &&
                        <ExpandLessIcon />
                    }
                </Grid>
            </Card>
            { open && props.venues.map((venue: Venue) =>
                <VenueCard
                    venue={venue}
                    key={venue.id}
                />
            )}
        </>
    )
}
