import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Box, CardMedia, CardActionArea, Typography, Button } from '@material-ui/core'

import { Review, User, Product } from '../@types'
import { RootState } from '../stores/index'
import { ReviewerMenu } from './ReviewerMenu'

interface ReviewDetail extends Review {
  user?: User
  product?: Product
}

interface Props {
  review: ReviewDetail
  setOpen: (value: boolean) => void
  setRating: (value: number) => void
  setResult: (value: number) => void
  setJoined_at: (value: string|null) => void
  setContents: (value: string|null) => void
  setIsEdit: (value: boolean) => void
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
  review, setOpen, setRating, setResult, setJoined_at, setContents, setIsEdit, className
}) => {
  const classes = useStyles(className)
  const currentUser = useSelector((state: RootState) => state.auth.user)

  return (
    <Grid container wrap='nowrap' alignItems='center'>
      <CardActionArea component={Link} to={`/users/${review.user?.account_id}`} className={classes.imgArea}>
        <CardMedia
          image={`/user_img/${review.user?.image_name}`}
          className={classes.img}
        />
      </CardActionArea>
      <Box className={classes.nameArea}>
        <Grid container direction='column'>
          <Typography variant='body1' component={Link} to={`/users/${review.user?.account_id}`} className={classes.userName}>
            { review.user?.name }
          </Typography>
          <Typography variant='body1' component={Link} to={`/users/${review.user?.account_id}`} className={classes.userId}>
            @{ review.user?.account_id}
          </Typography>
        </Grid>
      </Box>
      { (currentUser && review.user?.account_id !== currentUser.account_id) &&
        <Button variant='contained' color='primary'>
          <Typography variant='button'>フォロー</Typography>
        </Button>
      }
      { (currentUser && review.user?.account_id === currentUser.account_id) &&
        <ReviewerMenu
          review={review}
          setOpen={setOpen}
          setRating={setRating}
          setResult={setResult}
          setJoined_at={setJoined_at}
          setContents={setContents}
          setIsEdit={setIsEdit}
        />
      }
    </Grid>
  )
}
