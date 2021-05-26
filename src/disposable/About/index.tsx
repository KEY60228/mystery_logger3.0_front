import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

import { AboutTemplate as Template} from './layout'

export const About: FC = () => {
    return (
        <>
            <Helmet>
                <title>なぞログについて - なぞログ</title>
            </Helmet>
            <Template />
        </>
    )
}
