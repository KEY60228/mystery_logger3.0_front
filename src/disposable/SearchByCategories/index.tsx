import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

import { SearchByCategoriesTemplate as Template } from './layout'

export const SearchByCategories: FC = () => {
    return (
        <>
            <Helmet>
                <title>キーワードで検索 - なぞログ</title>
            </Helmet>
            <Template />
        </>
    )
}