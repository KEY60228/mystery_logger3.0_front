import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { CardActionArea, Typography } from '@material-ui/core'

import { Review, Product } from '../../../../../@types'
import { Ratings } from '../../../Ratings'

interface ReviewWithProduct extends Review {
    product?: Product
}

interface Props {
    review: ReviewWithProduct
    productTitle?: boolean
    className?: ClassProps
}

interface ClassProps {
    minHeight?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            minHeight: className.minHeight,
        }),
        remarks: {
            color: 'grey',
            fontSize: '12px',
            margin: '8px',
            width: '110px',
        },
        created: {
            color: 'grey',
            fontSize: '12px',
        },
    }),
)

export const ContentsWithActionArea: FC<Props> = ({
    review,
    productTitle,
    className,
}) => {
    const classes = useStyles(className)

    return (
        <CardActionArea
            component={Link}
            to={`/reviews/${review.id}`}
            className={classes.root}
        >
            <Typography variant="caption" className={classes.created}>
                {review.created_at}
            </Typography>
            {productTitle && review.product && (
                <Typography>{review.product.name}</Typography>
            )}
            <Ratings
                number={review.rating || 0}
                size="small"
                justify="flex-start"
                className={{ marginLeft: '4px' }}
            />
            <Typography variant="body2" className={classes.remarks}>
                参加日: {review.joined_at || '-'}{' '}
            </Typography>
            {review.result === 1 && (
                <Typography variant="body2" className={classes.remarks}>
                    脱出成功！
                </Typography>
            )}
            {review.result === 2 && (
                <Typography variant="body2" className={classes.remarks}>
                    脱出失敗…
                </Typography>
            )}
            <Typography variant="body2">{review.contents}</Typography>
        </CardActionArea>
    )
}
