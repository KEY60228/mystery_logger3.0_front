import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'

import { ProductDetail, ReviewWithUser } from '../../@types'
import { ReviewCard } from '../molecules/ReviewCard'

interface Props {
    product: ProductDetail
    setOpen: (value: boolean) => void
    setRating: (value: number) => void
    setResult: (value: number) => void
    setJoined_at: (value: string | null) => void
    setContents: (value: string | null) => void
    setIsEdit: (value: boolean) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
        },
    }),
)

export const ProductReviews: FC<Props> = ({
    product,
    setOpen,
    setRating,
    setResult,
    setJoined_at,
    setContents,
    setIsEdit,
    className,
}) => {
    const classes = useStyles(className)

    return (
        <>
            {product.reviews &&
                product.reviews.map((review: ReviewWithUser) => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        reviewerProfile
                        cardActionArea
                        setOpen={setOpen}
                        setRating={setRating}
                        setResult={setResult}
                        setJoined_at={setJoined_at}
                        setContents={setContents}
                        setIsEdit={setIsEdit}
                        className={{margin: '8px'}}
                    />
                ))
            }
            {!product.reviews &&
                <Card className={classes.root}>
                    <Typography>まだ投稿はありません</Typography>
                </Card>
            }
        </>
    )
}
