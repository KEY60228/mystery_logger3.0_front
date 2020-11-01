import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

interface Props {
    accountId: string
    setAccountId: (value: string) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
    margin?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            width: className.width,
            margin: className.margin,
        }),
    }),
)

export const AccountIdForm: FC<Props> = ({
    accountId,
    setAccountId,
    className,
}) => {
    const classes = useStyles(className)

    return (
        <TextField
            id="AccountId"
            label="Account ID"
            value={accountId}
            onChange={ev => setAccountId(ev.target.value)}
            className={classes.root}
        />
    )
}
