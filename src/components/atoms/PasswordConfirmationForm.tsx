import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

interface Props {
    passwordConfirmation: string
    setPasswordConfirmation: (value: string) => void
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

export const PasswordConfirmationForm: FC<Props> = ({
    passwordConfirmation,
    setPasswordConfirmation,
    className,
}) => {
    const classes = useStyles(className)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <FormControl className={classes.root}>
            <InputLabel htmlFor="passwordConfirmation">
                Password Confirmation
            </InputLabel>
            <Input
                type={showPassword ? 'text' : 'password'}
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={ev => setPasswordConfirmation(ev.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}
