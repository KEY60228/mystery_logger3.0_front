import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { PasswordForm } from '../atoms/PasswordForm'
import { EmailForm } from '../atoms/EmailForm'
import { SubmitButton } from '../atoms/SubmitButton'

interface Props {
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  login: () => void
  className?: ClassProps
}

interface ClassProps {
  width?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
  })
)

export const LoginForm: FC<Props> = ({
  email, setEmail, password, setPassword, login, className
}) => {
  const classes = useStyles(className)

  return (
    <form>
      <Grid container justify='center' alignItems='center'>
        <EmailForm
          email={email}
          setEmail={setEmail}
          className={{width: '300px', margin: '12px auto'}}
        />
        <PasswordForm 
          password={password}
          setPassword={setPassword}
          className={{width: '300px', margin: '12px auto'}}
        />
        <SubmitButton
          onClick={login}
          size='large'
          className={{}}
        />
      </Grid>
    </form>
  )
}