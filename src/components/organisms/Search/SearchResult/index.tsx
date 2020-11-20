import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'

import { ProductDetail } from '../../../../@types'
import { ProductCardInReviewDetail } from '../../ReviewDetail/ProductCardInReviewDetail'

interface Props {
    results: ProductDetail[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
        },
        text: {
            margin: '8px',
        },
    })
)

export const SearchResult: FC<Props> = ({
    results
}) => {
    const classes = useStyles()

    return (
        <>
            { results && results.map((product: ProductDetail) =>
                <ProductCardInReviewDetail key={product.id} product={product} />
            )}
            { !results.length &&
                <Card className={classes.root}>
                    <Typography className={classes.text}>該当する作品はありません</Typography>
                </Card>
            }
        </>
    )
}