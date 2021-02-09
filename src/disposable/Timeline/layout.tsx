import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider } from '@material-ui/core'

import { ReviewIndex } from '../../@types'
import { ReviewCard } from './components/ReviewCard'
import { Footer } from '../../reusable/Footer/Footer'

interface Props {
    reviews: ReviewIndex[]
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '0 20px',
        },
        title: {
            lineHeight: '32px',
            fontSize: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
            margin: '16px 0',
        },
        divider: {
            margin: '16px auto',
            width: '160px',
        }
    })
)

export const TimelineTemplate: FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            <p className={classes.title}>タイムライン</p>
            <Divider className={classes.divider} />
            <Box className={classes.root}>
                {props.reviews.map(review =>
                    <ReviewCard key={review.id} review={review} />
                )}
            </Box>
            <Footer />
        </>
    )
}