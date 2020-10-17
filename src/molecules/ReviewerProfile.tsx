import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Box, CardMedia, CardActionArea, Typography, Button } from '@material-ui/core'

import { User } from '../@types'

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

    },
    imgArea: {
      width: '60px',
    },
    img: {
      height: '48px',
      width: '48px',
      border: '1px solid grey',
      borderRadius: '50%',
      margin: '8px',
    },
    nameArea: {
      marginLeft: '8px',
      flexGrow: 1,
    },
    userName: {
      textDecoration: 'none',
      color: 'black',
      fontSize: '16px',
      width: '1%',
    },
    userId: {
      textDecoration: 'none',
      color: 'grey',
      fontSize: '12px',
      width: '1%',
    },
  })
)

export const ReviewerProfile: FC<Props> = ({
  user, className
}) => {
  const classes = useStyles(className)

  return (
    <Grid container wrap='nowrap' alignItems='center'>
      <CardActionArea component={Link} to={`/users/${user.account_id}`} className={classes.imgArea}>
        <CardMedia
          image={`/user_img/${user.image_name}`}
          className={classes.img}
        />
      </CardActionArea>
      <Box className={classes.nameArea}>
        <Grid container direction='column'>
          <Typography variant='body1' component={Link} to={`/users/${user.account_id}`} className={classes.userName}>
            { user.name }
          </Typography>
          <Typography variant='body1' component={Link} to={`/users/${user.account_id}`} className={classes.userId}>
            @{ user.account_id}
          </Typography>
        </Grid>
      </Box>
      <Button variant='contained' color='primary'>
        <Typography variant='button'>フォロー</Typography>
      </Button>
    </Grid>
  )
}
