import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

interface Props {
  email: string
  setEmail: (value: string) => void
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
    })
  })
)

export const EmailForm: FC<Props> = ({
  email, setEmail, className
}) => {
  const classes = useStyles(className)

  return (
    <TextField
      id="email"
      label="Email"
      value={email}
      onChange={(ev) => setEmail(ev.target.value)}
      className={classes.root}
    />
  )
}