import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

import { GuidelineTemplate as Template } from './layout'

export const Guideline: FC = () => {
    return (
        <>
            <Helmet>
                <title>ガイドライン - なぞログ</title>
            </Helmet>
            <Template />
        </>
    )
}