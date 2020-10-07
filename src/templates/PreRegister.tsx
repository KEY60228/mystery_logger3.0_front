import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'

import { PreRegisterForm } from '../organisms/PreRegisterForm'

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
      borderBottom: '1px groove grey',
      padding: '24px'
    }
  })
)

export const PreRegister: FC = (

) => {
  const classes = useStyles()

  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container direction='column' justify='center' alignItems='center'>
        <Typography variant='h5' className={classes.subtitle}>会員登録</Typography>
        <PreRegisterForm />
      </Grid>
    </Paper>
  )
}