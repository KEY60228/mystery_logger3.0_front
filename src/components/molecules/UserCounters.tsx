import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core' 

import { User } from '../../@types'

interface Props {
  user: User
  className?: ClassProps
}

interface ClassProps {
  width?: string
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: (className: ClassProps) => ({
      width: className.width || '250px'
    }),
    subtitle: {
      fontSize: '12px',
    },
    text: {
      fontWeight: 'bold'
    }
  })
)

export const UserCounters: FC<Props> = ({
  user, className
}) => {
  const classes = useStyles(className)

  return (
    <Grid container direction='row' wrap='nowrap' className={classes.root}>
      <Grid container direction='column' justify='center' alignItems='center'>
        <Typography variant='body1' className={classes.text}>
          {user.follows_count || 0}
        </Typography>
        <Typography variant='subtitle1' className={classes.subtitle}>
          フォロー
        </Typography>
      </Grid>
      <Grid container direction='column' justify='center' alignItems='center'>
        <Typography variant='body1' className={classes.text}>
          {user.followers_count || 0}
        </Typography>
        <Typography variant='subtitle1' className={classes.subtitle}>
          フォロワー
        </Typography>
      </Grid>
      <Grid container direction='column' justify='center' alignItems='center'>
        <Typography variant='body1' className={classes.text}>
          {user.success_rate ? `${user.success_rate * 100}%` : '-'}
        </Typography>
        <Typography variant='subtitle1' className={classes.subtitle}>
          成功率
        </Typography>
      </Grid>
    </Grid>
  )
}