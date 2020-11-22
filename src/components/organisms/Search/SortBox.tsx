import React, { useState, ChangeEvent, FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid, MenuItem, Select, Typography } from '@material-ui/core'

interface Props {
    sortProductsByReviewsCount: () => void
    sortProductsByAvgRatings: () => void
    sortProductsBySuccessRatesDesc: () => void
    sortProductsBySuccessRatesAsc: () => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '4px 8px',
            padding: '8px',
        },
        select: {
            marginLeft: '8px',
            width: '200px',
        },
    })
)

export const SortBox: FC<Props> = ({
    sortProductsByReviewsCount, sortProductsByAvgRatings, sortProductsBySuccessRatesDesc, sortProductsBySuccessRatesAsc,
}) => {
    const classes = useStyles()
    const [value, setValue] = useState<number>(0)

    const choices = [
        {
            id: 0,
            name: 'おすすめ順',
            onClick: () => console.log(),
        },
        {
            id: 1,
            name: '投稿の多い順',
            onClick: sortProductsByReviewsCount,
        },
        {
            id: 2,
            name: '評価の高い順',
            onClick: sortProductsByAvgRatings,
        },
        {
            id: 3,
            name: '成功率の高い順',
            onClick: sortProductsBySuccessRatesDesc,
        },
        {
            id: 4,
            name: '成功率の低い順',
            onClick: sortProductsBySuccessRatesAsc,
        },
        {
            id: 5,
            name: '行きたい人の多い順',
            onClick: () => console.log()
        },
    ]

    return (
        <Card className={classes.root}>
            <Grid container wrap='nowrap' justify='flex-end' alignItems='center'>
                <Typography>表示順:</Typography>
                <Select
                    value={value}
                    onChange={(ev: ChangeEvent<{ value: unknown }>) => {
                        setValue(ev.target.value as number)
                        choices.find((choice => choice.id === ev.target.value))?.onClick()
                    }}
                    className={classes.select}
                >
                    { choices.map((choice: {id: number, name: string, onClick: () => void}) =>
                        <MenuItem key={choice.id} value={choice.id}>{choice.name}</MenuItem>
                    )}
                </Select>
            </Grid>
        </Card>
    )
}