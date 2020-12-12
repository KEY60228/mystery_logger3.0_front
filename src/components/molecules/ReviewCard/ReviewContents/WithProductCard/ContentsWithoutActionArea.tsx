import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

import { Review, Product } from '../../../../../@types'
import { Ratings } from '../../../Ratings'

interface ReviewWithProduct extends Review {
    product?: Product
}

interface Props {
    review: ReviewWithProduct
    productTitle?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

export const ContentsWithoutActionArea: FC<Props> = props => {
    const classes = useStyles()

    return (
        <Box>
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
            <Typography variant="body2">{props.review.contents}</Typography>
        </Box>
    )
}