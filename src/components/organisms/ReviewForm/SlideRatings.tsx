import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Slider } from '@material-ui/core'

import { Ratings } from '../../molecules/Ratings'

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

export const SlideRatings: FC<Props> = ({ rating, setRating, className }) => {
    const classes = useStyles(className)

    return (
        <>
            <Ratings
                number={rating}
                size="large"
                className={{
                    marginLeft: className?.marginLeft,
                    fontSize: className?.fontSize,
                }}
            />
            <Slider
                value={rating}
                onChange={(ev, newValue: number) => setRating(newValue)}
                max={5}
                step={0.5}
                className={classes.slider}
            />
        </>
    )
}
