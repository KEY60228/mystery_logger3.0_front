import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@material-ui/core'

import { ReviewWithUser } from '../@types'
import { Ratings } from '../atoms/Ratings'

interface Props {
  review: ReviewWithUser
  className?: ClassProps
}

interface ClassProps {
  width?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '8px'
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
    userName: {
      color: 'black',
      fontSize: '16px',
      marginLeft: '8px',
      textDecoration: 'none',
      display: 'inline',
      width: '1%',
    },
    userId: {
      color: 'grey',
      fontSize: '12px',
      marginLeft: '8px',
      textDecoration: 'none',
      display: 'inline',
      width: '1%',
    },
    remarks: {
      color: 'grey',
      fontSize: '12px',
      margin: '8px',
      width: '110px',
    }
  })
)

export const ReviewCardWithUser: FC<Props> = ({
  review, className
}) => {
  const classes = useStyles(className)

  return (
    <Card className={classes.root}>
        <Grid container wrap='nowrap' alignItems='center'>
          <CardActionArea component={Link} to={`/users/${review.user.account_id}`} className={classes.imgArea}>
            <CardMedia
              image={`/user_img/${review.user.image_name}`}
              className={classes.img}
            />
          </CardActionArea>
          <Grid container direction='column'>
            <Typography variant='body1' component={Link} to={`/users/${review.user.account_id}`} className={classes.userName}>
              { review.user.name }
            </Typography>
            <Typography variant='body1' component={Link} to={`/users/${review.user.account_id}`} className={classes.userId}>
              @{ review.user.account_id}
            </Typography>
          </Grid>
        </Grid>
      <CardActionArea component={Link} to={`/reviews/${review.id}`}>
        <Ratings number={review.rating || 0} size='small' justify='flex-start' className={{ marginLeft: '4px' }} />
        <Grid container>
          { review.result === 1 &&
            <Typography variant='body2' className={classes.remarks}>脱出成功！</Typography>
          }
          { review.result === 2 &&
            <Typography variant='body2' className={classes.remarks}>脱出失敗…</Typography>
          }
          <Typography variant='body2' className={classes.remarks}>参加日: {review.joined_at || '-'} </Typography>
        </Grid>
        <Typography variant='body2'>{review.contents}</Typography>
        <Grid container justify='flex-end'>
          <Typography variant='caption'>{review.created_at}</Typography>
        </Grid>
      </CardActionArea>
    </Card>
  )
}

