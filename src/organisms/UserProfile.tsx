import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, CardMedia, Grid, Typography, Button } from '@material-ui/core'

import { User } from '../@types'
import { UserCounters } from '../molecules/UserCounters'

interface Props {
  user: User
  className?: ClassProps
}

interface ClassProps {
  width?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '8px',
    },
    media: {
      height: '72px',
      width: '72px',
      border: '1px solid grey',
      borderRadius: '50%',
      margin: '8px',
    },
    userName: {
      fontSize: '16px',
      marginLeft: '20px',
    },
    userId: {
      color: 'grey',
      fontSize: '12px',
      marginLeft: '8px',
    },
    button: {
      fontSize: '12px',
      width: '150px',
      marginRight: '20px',
    },
    profile: {
      fontSize: '12px',
      margin: '20px',
    },
  })
)

export const UserProfile: FC<Props> = ({
  user, className
}) => {
  const classes = useStyles(className)

  return (
    <Card className={classes.root}>
      <Grid container justify='space-around' alignItems='center'>
        <CardMedia image={`/user_img/${user.image_name}`} className={classes.media} />
        <UserCounters user={user} />
      </Grid>
      <Grid container justify='space-around' alignItems='center' wrap='nowrap'>
        <Grid container alignItems='center'>
          <Typography variant='subtitle1' className={classes.userName}>
            {user.name}
          </Typography>
          <Typography variant='body1' className={classes.userId}>
            @{user.account_id}
          </Typography>
        </Grid>
        { user.account_id === 'guest' &&
          <Button>設定</Button>
        }
        { user.account_id !== 'guest' &&
          <Button color='primary' variant='contained' className={classes.button}>フォローする</Button>
        }
      </Grid>
      <Typography variant='body1' className={classes.profile}>{ user.profile }</Typography>
    </Card>
  )
}
