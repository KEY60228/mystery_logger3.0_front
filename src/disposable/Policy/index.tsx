import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

import { PolicyTemplate as Template } from './layout'

export const Policy: FC = () => {
    return (
        <>
            <Helmet>
                <title>プライバシーポリシー - なぞログ</title>
            </Helmet>
            <Template />
        </>
    )
}
