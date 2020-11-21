import React, { FC, ChangeEvent } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { Select, MenuItem } from '@material-ui/core'

interface Props {
    value: number
    setValue: (value: number) => void
    choices: {
        id: number
        name: string
    }[]
    className?: ClassProps
}

interface ClassProps {
    width?: string
    margin?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
        select: (className: ClassProps) => ({
            width: className.width || '200px',
            margin: className.margin || '8px',
        }),
    }),
)

export const SelectForm: FC<Props> = ({ value, setValue, choices, className }) => {
    const classes = useStyles(className)

    return (
        <>
            <Select
                value={value}
                onChange={(ev: ChangeEvent<{ value: unknown }>) =>
                    setValue(ev.target.value as number)
                }
                className={classes.select}
            >
                { choices.map((choice: {id: number, name: string}) =>
                    <MenuItem key={choice.id} value={choice.id}>{choice.name}</MenuItem>
                )}
            </Select>
        </>
    )
}
