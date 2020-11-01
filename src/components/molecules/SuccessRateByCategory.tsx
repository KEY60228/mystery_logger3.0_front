import React, { FC } from 'react'
import {
    Radar,
    RadarChart,
    PolarGrid,
    Legend,
    PolarAngleAxis,
    PolarRadiusAxis,
} from 'recharts'

// import { User, Product } from '../@types'

// interface Props {
//   user: User
//   product: Product
// }

export const SuccessRateByCategory: FC = () => {
    const data = [
        {
            subject: 'ルーム', // 作品カテゴリ
            A: 20, // ユーザーの投稿数
            B: 10, // ユーザーの成功数
            fullMark: 50, // Max数。仮置き
        },
        {
            subject: 'ホール', // 作品カテゴリ
            A: 18, // ユーザーの投稿数
            B: 5, // ユーザーの成功数
            fullMark: 50, // Max数。仮置き
        },
        {
            subject: 'キット配布型', // 作品カテゴリ
            A: 11, // ユーザーの投稿数
            B: 3, // ユーザーの成功数
            fullMark: 50, // Max数。仮置き
        },
        {
            subject: 'オンライン', // 作品カテゴリ
            A: 3, // ユーザーの投稿数
            B: 2, // ユーザーの成功数
            fullMark: 50, // Max数。仮置き
        },
        {
            subject: 'その他', // 作品カテゴリ
            A: 13, // ユーザーの投稿数
            B: 5, // ユーザーの成功数
            fullMark: 50, // Max数。仮置き
        },
    ]

    return (
        <RadarChart width={350} height={300} outerRadius={'70%'} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={90} domain={[0, 30]} />
            <Radar
                name="参加数"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
            />
            <Radar
                name="成功数"
                dataKey="B"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
            />
            <Legend />
        </RadarChart>
    )
}
