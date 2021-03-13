import React, { FC, useState } from 'react'
import { Helmet } from 'react-helmet'

import { SearchByKeywordsTemplate as Template } from './layout'

export const SearchByKeywords: FC = () => {
    const [keywords, setKeywords] = useState<string>('')

    return (
        <>
            <Helmet>
                <title>キーワードで検索 - なぞログ</title>
            </Helmet>
            <Template
                keywords={keywords}
                setKeywords={setKeywords}
            />
        </>
    )
}