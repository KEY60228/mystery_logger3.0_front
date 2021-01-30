import React, { FC } from 'react'

import { AccompanyIndex } from '../../@types'
import { AccompaniesList } from './components/AccompaniesList'

interface Props {
    accompanies: AccompanyIndex[]
}

export const Accompanies: FC<Props> = props => {
    return (
        <>
            <AccompaniesList accompanies={props.accompanies} />
        </>
    )
}
