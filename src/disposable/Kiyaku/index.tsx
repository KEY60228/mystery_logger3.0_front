import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

import { KiyakuTemplate as Template } from './layout'

export const Kiyaku: FC = () => {
    return (
        <>
            <Helmet>
                <title>利用規約 - なぞログ</title>
            </Helmet>
            <Template />
        </>
    )
}
