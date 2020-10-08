import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { AccountIdForm } from '../atoms/AccountIdForm'
import { NameForm } from '../atoms/NameForm'
import { PasswordForm } from '../atoms/PasswordForm'
import { PasswordConfirmationForm } from '../atoms/PasswordConfirmationForm'
import { SubmitButton } from '../atoms/SubmitButton'

interface Props {
  accountId: string
  setAccountId: (value: string) => void
  name: string
  setName: (value: string) => void
  password: string
  setPassword: (value: string) => void
  passwordConfirmation: string
  setPasswordConfirmation: (value: string) => void
  register: () => void
  className?: ClassProps
}

interface ClassProps {
  width?: string
}

const useStyles = makeStyles((theme: Theme) => (
  createStyles({

  })
))

export const RegisterForm: FC<Props> = ({
  accountId, setAccountId, name, setName, password, setPassword, passwordConfirmation, setPasswordConfirmation, register, className
}) => {
  const classes = useStyles(className)

  return (
    <form>
    <Grid container direction='column' justify='center' alignItems='center'>
      <AccountIdForm 
        accountId={accountId}
        setAccountId={setAccountId}
        className={{width: '300px', margin: '12px auto'}}
      />
      <NameForm 
        name={name}
        setName={setName}
        className={{width: '300px', margin: '12px auto'}}
      />
      <PasswordForm 
        password={password}
        setPassword={setPassword}
        className={{width: '300px', margin: '12px auto'}}
      />
      <PasswordConfirmationForm 
        passwordConfirmation={passwordConfirmation}
        setPasswordConfirmation={setPasswordConfirmation}
        className={{width: '300px', margin: '12px auto'}}
      />
      <SubmitButton
        onClick={register}
        size='large'
        className={{}}
      />
    </Grid>
  </form>
  )
}