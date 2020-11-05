import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'

import { Review, User, Product } from '../../../@types'
import { ReviewerProfile } from './ReviewerProfile'
import { ReviewContents } from './ReviewContents'

interface ReviewDetail extends Review {
    user?: User
    product?: Product
}

interface Props {
    review: ReviewDetail
    reviewerProfile?: boolean
    cardActionArea?: boolean
    productTitle?: boolean
    productCard?: boolean
    shorten?: boolean
    edit: (review: ReviewDetail) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    className?: ClassProps
}

interface ClassProps {
    margin?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            margin: className.margin || '8px',
            padding: '8px',
        }),
    }),
)

export const ReviewCard: FC<Props> = ({
    review,
    reviewerProfile,
    cardActionArea,
    productTitle,
    productCard,
    shorten,
    edit,
    follow,
    unfollow,
    className,
}) => {
    const classes = useStyles(className)

    return (
        <Card className={classes.root}>
            {reviewerProfile && review.user && (
                <ReviewerProfile review={review} edit={edit} follow={follow} unfollow={unfollow} />
            )}
            <ReviewContents
                review={review}
                productCard={productCard}
                productTitle={productTitle}
                cardActionArea={cardActionArea}
                className={productCard ? { minHeight: '200px' } : {}}
            />
        </Card>
    )
}
