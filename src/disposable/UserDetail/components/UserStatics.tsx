import React, { FC } from 'react'
import {
    Radar,
    RadarChart,
    PolarGrid,
    Legend,
    PolarAngleAxis,
    PolarRadiusAxis,
} from 'recharts'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { UserDetail } from '../../../@types'

interface Props {
    user: UserDetail
}

const useStyles = makeStyles(createStyles({
    root: {
        margin: '0 auto',
    }
}))

export const UserStatics: FC<Props> = props => {
    const classes = useStyles()

    // 行った作品をカテゴリーでfilter
    const reviewsCount = (category_id: number): number => {
        const reviews = props.user.reviews.filter(
            review => review.product.category_id === category_id,
        )
        return reviews.length
    }

    // 成功した作品をカテゴリーでfilter
    const successReviewsCount = (category_id: number): number => {
        const reviews = props.user.reviews
            .filter(review => review.product.category_id === category_id)
            .filter(review => review.result === 1)
        return reviews.length
    }

    // 最大値を人によって変更する
    const maxCount = (): number => {
        // 仮
        // めちゃめちゃイケてないけどパッと思い浮かばなかった…
        const maxReviewsCount = Math.max(
            reviewsCount(1),
            reviewsCount(2),
            reviewsCount(3),
            reviewsCount(4),
            reviewsCount(5),
        )
        if (maxReviewsCount <= 5) {
            return 5
        } else if (maxReviewsCount >= 5 && maxReviewsCount <= 10) {
            return 10
        } else if (maxReviewsCount >= 10 && maxReviewsCount <= 15) {
            return 15
        } else if (maxReviewsCount >= 15 && maxReviewsCount <= 20) {
            return 20
        } else {
            return 30
        }
    }

    const data = [
        {
            subject: 'ルーム', // 作品カテゴリ
            A: reviewsCount(1), // ユーザーの投稿数
            B: successReviewsCount(1), // ユーザーの成功数
            fullMark: maxCount(), // Max数。仮置き
        },
        {
            subject: 'ホール', // 作品カテゴリ
            A: reviewsCount(2), // ユーザーの投稿数
            B: successReviewsCount(2), // ユーザーの成功数
            fullMark: maxCount(), // Max数。仮置き
        },
        {
            subject: 'キット配布型', // 作品カテゴリ
            A: reviewsCount(3), // ユーザーの投稿数
            B: successReviewsCount(3), // ユーザーの成功数
            fullMark: maxCount(), // Max数。仮置き
        },
        {
            subject: 'オンライン', // 作品カテゴリ
            A: reviewsCount(4), // ユーザーの投稿数
            B: successReviewsCount(4), // ユーザーの成功数
            fullMark: maxCount(), // Max数。仮置き
        },
        {
            subject: 'その他', // 作品カテゴリ
            A: reviewsCount(5), // ユーザーの投稿数
            B: successReviewsCount(5), // ユーザーの成功数
            fullMark: maxCount(), // Max数。仮置き
        },
    ]

    return (
        <RadarChart width={330} height={288} outerRadius={'70%'} data={data} className={classes.root}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={90} domain={[0, maxCount()]} />
            <Radar
                name="参加数"
                dataKey="A"
                stroke="#FFAC00"
                fill="#FFAC00"
                fillOpacity={0.5}
            />
            <Radar
                name="成功数"
                dataKey="B"
                stroke="#FF0000"
                fill="#FF0000"
                fillOpacity={0.5}
            />
            <Legend />
        </RadarChart>
    )
}
