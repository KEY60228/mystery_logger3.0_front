import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import { Product } from '../../@types'
import { TempSpace } from '../organisms/TempSpace'
import { LinedProducts } from '../organisms/LinedProducts'

interface Props {
    products: Product[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        subtitle: {
            width: '100%',
            backgroundColor: 'gainsboro',
        },
    }),
)

export const TopPage: FC<Props> = ({ products }) => {
    const classes = useStyles()

    // 名前でソート
    const sortProductsByName = (products: Product[]) => {
        return products
            .sort((a, b) => {
                const nameA: string = a.name.toUpperCase()
                const nameB: string = b.name.toUpperCase()
                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0
            })
            .slice(0, 6)
    }

    // レビュー数でソート
    const sortProductsByReviewsCount = (products: Product[]) => {
        return products
            .sort((a, b) => {
                return b.reviews_count - a.reviews_count
            })
            .slice(0, 6)
    }

    // レートでソート
    const sortProductsByAvgRatings = (products: Product[]) => {
        return products
            .sort((a, b) => {
                const avgRatingA = a.avg_rating || 0
                const avgRatingB = b.avg_rating || 0

                return avgRatingB - avgRatingA
            })
            .slice(0, 6)
    }

    // レビュー数でソート
    const sortProductsBySuccessRates = (products: Product[]) => {
        return products
            .sort((a, b) => {
                const successRateA = a.success_rate || 0
                const successRateB = b.success_rate || 0

                return successRateB - successRateA
            })
            .slice(0, 6)
    }

    return (
        <>
            <TempSpace text="Banner Space" />
            <Typography className={classes.subtitle}>
                投稿数の多い作品
            </Typography>
            <LinedProducts products={sortProductsByReviewsCount(products)} />
            <Typography className={classes.subtitle}>評価の高い作品</Typography>
            <LinedProducts products={sortProductsByAvgRatings(products)} />
            <Typography className={classes.subtitle}>
                成功率の高い作品
            </Typography>
            <LinedProducts products={sortProductsBySuccessRates(products)} />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
        </>
    )
}
