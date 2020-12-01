import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'

interface Props {
    number: number
    size?: 'large' | 'medium' | 'small'
    justify?: 'flex-start'
    className?: ClassProps
}

interface ClassProps {
    width?: string
    fontSize?: string
    marginLeft?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            width: className.width,
        }),
        text: (className: ClassProps) => ({
            fontSize: className.fontSize,
            marginLeft: className.marginLeft,
        }),
    }),
)

export const Ratings: FC<Props> = props => {
    const classes = useStyles(props.className)

    return (
        <Grid
            container
            justify={props.justify || 'center'}
            alignItems="center"
            className={classes.root}
        >
            <Rating
                value={
                    props.number == 0 ? 0 : parseFloat(props.number.toFixed(1))
                }
                precision={0.1}
                readOnly
                size={props.size}
            />
            <Typography variant="caption" className={classes.text}>
                {props.number == 0 ? '-' : props.number.toFixed(1)}
            </Typography>
        </Grid>
    )
}
