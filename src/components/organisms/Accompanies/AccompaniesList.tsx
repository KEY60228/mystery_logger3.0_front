import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'

import { AccompanyIndex } from '../../../@types'
import { AccompanyCard } from './AccompanyCard'

interface Props {
    accompanies: AccompanyIndex[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        card: {
            margin: '8px',
            padding: '8px',
        },
    }),
)

export const AccompaniesList: FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            {props.accompanies.length !== 0 &&
                props.accompanies.map(accompany => (
                    <AccompanyCard key={accompany.id} accompany={accompany} />
                ))}
            {props.accompanies.length === 0 && (
                <Card className={classes.card}>まだ同行募集はありません</Card>
            )}
        </>
    )
}
