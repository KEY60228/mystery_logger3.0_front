import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'

import { ProductDetail } from '../../../@types'
import { ProductCardM } from '../../molecules/ProductCardM/'

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
    }),
)

export const SearchResult: FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            {props.results &&
                props.results.map((product: ProductDetail) => (
                    <ProductCardM key={product.id} product={product} />
                ))}
            {!props.results.length && (
                <Card className={classes.root}>
                    <Typography className={classes.text}>
                        該当する作品はありません
                    </Typography>
                </Card>
            )}
        </>
    )
}
