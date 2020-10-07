import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { EmailForm } from '../atoms/EmailForm'
import { SubmitButton } from '../atoms/SubmitButton'

interface Props {
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
  className
}) => {
  const classes = useStyles(className)
  // 仮
  const [email, setEmail] = useState<string>('')
  const onClick = () => console.log(email)

  return (
    <form>
      <Grid container justify='center' alignItems='center'>
        <EmailForm
          email={email}
          setEmail={setEmail}
          className={{width: '300px', margin: '12px auto'}}
        />
        <SubmitButton
          onClick={onClick}
          size='large'
          className={{}}
        />
      </Grid>
    </form>
  )
}