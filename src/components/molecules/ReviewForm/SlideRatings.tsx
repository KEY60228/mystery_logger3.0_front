import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Slider } from '@material-ui/core'

import { Ratings } from '../Ratings'

interface Props {
    rating: number
    setRating: (value: number) => void
    className?: ClassProps
}

interface ClassProps {
    marginLeft?: string
    fontSize?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        slider: {
            width: '180px',
            margin: 'auto',
        },
    }),
)

export const SlideRatings: FC<Props> = props => {
    const classes = useStyles(props.className)

    return (
        <>
            <Ratings
                number={props.rating}
                size="large"
                className={{
                    marginLeft: props.className?.marginLeft,
                    fontSize: props.className?.fontSize,
                }}
            />
            <Slider
                value={props.rating}
                onChange={(ev, newValue: number) => props.setRating(newValue)}
                max={5}
                step={0.5}
                className={classes.slider}
            />
        </>
    )
}
