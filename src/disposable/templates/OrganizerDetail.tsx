import React, { FC } from 'react'

import { OrganizerDetail as OrganizerDetailInterface } from '../../@types'
import { OrganizerCard } from '../../components/organisms/OrganizerDetail/OrganizerCard'
import { OrganizerProducts } from '../../components/organisms/OrganizerDetail/OrganizerProducts'
import { OrganizerVenues } from '../../components/organisms/OrganizerDetail/OrganizerVenues'
import { TempSpace } from '../../reusable/TempSpace'

interface Props {
    organizer: OrganizerDetailInterface
}

export const OrganizerDetail: FC<Props> = props => {
    return (
        <>
            <OrganizerCard organizer={props.organizer} />
            <OrganizerVenues venues={props.organizer.venues} />
            <OrganizerProducts products={props.organizer.products} />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
        </>
    )
}
