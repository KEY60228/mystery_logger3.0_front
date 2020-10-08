import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { EmailForm } from '../atoms/EmailForm'
import { SubmitButton } from '../atoms/SubmitButton'

interface Props {
  email: string
  setEmail: (value: string) => void
  preRegister: () => void
  className?: ClassProps
}

interface ClassProps {
  width?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
  })
)

export const PreRegisterForm: FC<Props> = ({
  email, setEmail, preRegister, className
}) => {
  const classes = useStyles(className)

  return (
    <form>
      <Grid container direction='column' justify='center' alignItems='center'>
        <EmailForm
          email={email}
          setEmail={setEmail}
          className={{width: '300px', margin: '12px auto'}}
        />
        <SubmitButton
          onClick={preRegister}
          size='large'
          className={{}}
        />
      </Grid>
    </form>
  )
}