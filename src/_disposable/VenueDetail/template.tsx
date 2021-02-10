import React, { FC } from 'react'

import { VenueDetail as VenueDetailInterface } from '../../@types'
import { VenueContents } from './components/VenueContents'
import { VenuePerformances } from './components/VenuePerformances'
import { SimpleMap } from './components/GoogleMaps'
import { TempSpace } from '../../_reusable/TempSpace'

interface Props {
    venue: VenueDetailInterface
}

export const VenueDetailTemplate: FC<Props> = props => {
    return (
        <>
            <VenueContents venue={props.venue} />
            <SimpleMap venue={props.venue} />
            <VenuePerformances performances={props.venue.performances} />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
        </>
    )
}
