import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

import { SearchByKeywordsTemplate as Template } from './layout'

export const SearchByKeywords: FC = () => {
    return (
        <>
            <Helmet>
                <title>キーワードで検索 - なぞログ</title>
            </Helmet>
            <Template />
        </>
    )
}