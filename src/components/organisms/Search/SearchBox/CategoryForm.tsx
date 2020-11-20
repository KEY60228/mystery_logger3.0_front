import React, { FC, ChangeEvent } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { Select, MenuItem } from '@material-ui/core'

interface Props {
    category: number
    setCategory: (value: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '200px',
            margin: '8px',
        },
    }),
)

export const CategoryForm: FC<Props> = ({ category, setCategory }) => {
    const classes = useStyles()

    return (
        <>
            <Select
                id="category-select"
                value={category}
                onChange={(ev: ChangeEvent<{ value: unknown }>) =>
                    setCategory(ev.target.value as number)
                }
                className={classes.root}
            >
                <MenuItem value={0}>カテゴリーを選択</MenuItem>
                <MenuItem value={1}>ルームタイプ</MenuItem>
                <MenuItem value={2}>ホールタイプ</MenuItem>
                <MenuItem value={3}>キット配布タイプ</MenuItem>
                <MenuItem value={4}>オンラインタイプ</MenuItem>
            </Select>
        </>
    )
}
