import React, { FC } from 'react'

import { Product } from '../../@types'
import { TempSpace } from '../molecules/TempSpace'
import { LinedProducts } from '../organisms/TopPage/LinedProducts'

interface Props {
    products: Product[]
}

export const TopPage: FC<Props> = ({ products }) => {
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

    // 成功率でソート (高い順)
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
            <LinedProducts
                products={sortProductsByReviewsCount(products)}
                subtitle="投稿数の多い作品"
            />
            <LinedProducts
                products={sortProductsByAvgRatings(products)}
                subtitle="評価の高い作品"
            />
            <LinedProducts
                products={sortProductsBySuccessRates(products)}
                subtitle="成功率の高い作品"
            />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
        </>
    )
}
