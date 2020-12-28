import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, CardMedia, Typography } from '@material-ui/core'

import { AccompanyIndex } from '../../../@types'

interface Props {
    accompany: AccompanyIndex
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        img: {
            minWidth: '80px',
            height: '120px',
            backgroundSize: 'contain',
            margin: '8px',
        },
    }),
)

export const AccompanyCard: FC<Props> = props => {
    const classes = useStyles()

    return (
        <Card>
            <CardMedia
                image={props.accompany.performance.product.image_name}
                className={classes.img}
            />
            <Typography>{props.accompany.performance.product.name}</Typography>
            <Typography>{props.accompany.performance.venue.name}</Typography>
            <Typography>{props.accompany.contents}</Typography>
        </Card>
    )
}
