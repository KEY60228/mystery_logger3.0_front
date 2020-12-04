import React, { FC } from 'react'

import { AccompanyDetail } from '../../@types'
import { AccompaniesList } from '../organisms/Accompanies/AccompaniesList'

interface Props {
    accompanies: AccompanyDetail[]
}

export const Accompanies: FC<Props> = props => {
    return (
        <>
            <AccompaniesList accompanies={props.accompanies} />
        </>
    )
}

