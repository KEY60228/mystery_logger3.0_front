import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'

import { LoginForm } from '../organisms/LoginForm'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      height: '100%',
    },
    paper: {
      margin: '12px',
    },
    subtitle: {
      width: '100%',
      textAlign: 'center',
      borderBottom: '1px solid grey',
      padding: '24px'
    }
  })
)

export const Login: FC = (

) => {
  const classes = useStyles()

  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container direction='column' justify='center' alignItems='center'>
        <Typography variant='h5' className={classes.subtitle}>ログイン</Typography>
        <LoginForm />
      </Grid>
    </Paper>
  )
}