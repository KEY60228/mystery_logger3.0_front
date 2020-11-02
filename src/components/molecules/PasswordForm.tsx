import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    InputAdornment,
    IconButton,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

interface Props {
    password: string
    setPassword: (value: string) => void
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

export const PasswordForm: FC<Props> = ({
    password,
    setPassword,
    className,
}) => {
    const classes = useStyles(className)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <FormControl className={classes.root}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                aria-describedby={`password-helper`}
                value={password}
                onChange={ev => setPassword(ev.target.value)}
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
            {/* <FormHelperText id={`password-helper`}>
                
            </FormHelperText> */}
        </FormControl>
    )
}
