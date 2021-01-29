import React, { FC } from 'react'

import { AccompanyIndex } from '../../@types'
import { AccompaniesList } from '../organisms/Accompanies/AccompaniesList'

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
