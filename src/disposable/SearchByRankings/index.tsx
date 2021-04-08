import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

import { SearchByRankingsTemplate as Template } from './layout'

export const SearchByRankings: FC = () => {
    return (
        <>
            <Helmet>
                <title>ランキングで検索 - なぞログ</title>
            </Helmet>
            <Template />
        </>
    )
}