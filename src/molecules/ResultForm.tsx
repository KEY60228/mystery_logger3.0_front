import React, { FC, ChangeEvent } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { InputLabel, Select, MenuItem } from '@material-ui/core'

interface Props {
    result: number
    setResult: (value: number) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
        select: (className: ClassProps) => ({
            width: className.width
        })
    })
)

export const ResultForm: FC<Props> = ({
    result, setResult, className
}) => {
    const classes = useStyles(className)

    return (
        <>
            <InputLabel id="result-select-label">Result</InputLabel>
            <Select
                labelId="result-select-label"
                id="result-select"
                value={result}
                onChange={(ev: ChangeEvent<{ value: unknown }>) => setResult(ev.target.value as number)}
                className={classes.select}
            >
                <MenuItem value={0}>---</MenuItem>
                <MenuItem value={1}>Success!</MenuItem>
                <MenuItem value={2}>Failure...</MenuItem>
            </Select>
        </>
    )
}
