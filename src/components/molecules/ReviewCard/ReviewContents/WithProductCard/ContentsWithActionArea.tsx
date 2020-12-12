import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { CardActionArea, Typography, Box } from '@material-ui/core'

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
        contents: {
            whiteSpace: 'pre-wrap',
        },
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

export const ContentsWithActionArea: FC<Props> = props => {
    const classes = useStyles(props.className)

    return (
        <CardActionArea
            component={Link}
            to={`/reviews/${props.review.id}`}
            className={classes.root}
        >
            <Typography variant="caption" className={classes.created}>
                {props.review.created_at}
            </Typography>
            {props.productTitle && props.review.product && (
                <Typography>{props.review.product.name}</Typography>
            )}
            <Ratings
                number={props.review.rating || 0}
                size="small"
                justify="flex-start"
                className={{ marginLeft: '4px' }}
            />
            <Typography variant="body2" className={classes.remarks}>
                参加日: {props.review.joined_at || '-'}{' '}
            </Typography>
            {props.review.result === 1 && (
                <Typography variant="body2" className={classes.remarks}>
                    脱出成功！
                </Typography>
            )}
            {props.review.result === 2 && (
                <Typography variant="body2" className={classes.remarks}>
                    脱出失敗…
                </Typography>
            )}
            <Box className={classes.contents}>
                <Typography variant="body2">{props.review.contents}</Typography>
            </Box>
        </CardActionArea>
    )
}
