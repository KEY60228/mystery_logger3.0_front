import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { AccompanyDetail } from '../../../@types'
import { AccompanyCard } from './AccompanyCard'

interface Props {
    accompanies: AccompanyDetail[]
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {

        }
    })
)

export const AccompaniesList: FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            { props.accompanies.length !== 0 && props.accompanies.map((accompany: AccompanyDetail) =>
                <AccompanyCard
                    key={accompany.id}
                    accompany={accompany}
                />
            )}
            { props.accompanies.length === 0 &&
                <div>まだ同行募集はありません</div>
            }
        </>
    )
}
