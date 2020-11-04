import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
} from '@material-ui/core'

interface Props {
    label: string
    value: string | number
    setValue: (value: string | number) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
    margin?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            width: className.width || '300px',
            margin: className.margin || '12px auto',
        }),
    }),
)

export const Form: FC<Props> = ({ label, value, setValue, className }) => {
    const classes = useStyles(className)

    return (
        <FormControl className={classes.root}>
            <InputLabel htmlFor={label}>{label}</InputLabel>
            <Input
                id={label}
                aria-describedby={`${label}-helper`}
                value={value}
                onChange={ev => setValue(ev.target.value)}
            />
            {/* <FormHelperText id={`${label}-helper`}>
                
            </FormHelperText> */}
        </FormControl>
    )
}
