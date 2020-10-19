import React, { FC } from 'react'
import  { Link } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Box, Grid, CardActionArea, Typography } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import { Review, Product } from '../@types'
import { Ratings } from '../atoms/Ratings'
import { ProductCard } from '../organisms/ProductCard'

interface ReviewWithProduct extends Review {
  product?: Product
}

interface Props {
  review: ReviewWithProduct
  productCard?: boolean
  productTitle?: boolean
  cardActionArea?: boolean
  className?: ClassProps
}

interface ClassProps {
  minHeight?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionArea: (className: ClassProps) => ({
      minHeight: className.minHeight
    }),
    remarks: {
      color: 'grey',
      fontSize: '12px',
      margin: '8px',
      width: '110px',
    },
    created: {
      color: 'grey',
      fontSize: '12px',
    }
  })
)

export const ReviewContents: FC<Props> = ({
  review, productCard, productTitle, cardActionArea, className
}) => {
  const classes = useStyles(className)

  return (
    <>
      { !productCard &&
        <Box>
          { cardActionArea &&
            <CardActionArea component={Link} to={`/reviews/${review.id}`} className={classes.actionArea}>
              <Grid container justify='space-between' wrap='nowrap' alignItems='center'>
                <Grid container direction='column'>
                  { (productTitle && review.product) &&
                    <Typography>{ review.product.name }</Typography>
                  }
                  <Ratings number={review.rating || 0} size='small' justify='flex-start' className={{ marginLeft: '4px' }} />
                  <Grid container>
                    <Typography variant='body2' className={classes.remarks}>参加日: {review.joined_at || '-'} </Typography>
                    { review.result === 1 &&
                      <Typography variant='body2' className={classes.remarks}>脱出成功！</Typography>
                    }
                    { review.result === 2 &&
                      <Typography variant='body2' className={classes.remarks}>脱出失敗…</Typography>
                    }
                  </Grid>
                  <Typography variant='body2'>{review.contents}</Typography>
                </Grid>
                <NavigateNextIcon />
              </Grid>
            </CardActionArea>
          }
          { !cardActionArea &&
            <Box>
              { (productTitle && review.product) &&
                <Typography>{ review.product.name }</Typography>
              }
              <Grid container>
                <Ratings number={review.rating || 0} size='small' justify='flex-start' className={{ marginLeft: '4px' }} />
                <Typography variant='body2' className={classes.remarks}>参加日: {review.joined_at || '-'} </Typography>
                { review.result === 1 &&
                  <Typography variant='body2' className={classes.remarks}>脱出成功！</Typography>
                }
                { review.result === 2 &&
                  <Typography variant='body2' className={classes.remarks}>脱出失敗…</Typography>
                }
              </Grid>
              <Typography variant='body2'>{review.contents}</Typography>
            </Box>
          }
        </Box>
      }
      { (productCard && review.product) &&
        <Grid container justify='space-between' alignItems='flex-start' wrap='nowrap'>
          { cardActionArea &&
            <CardActionArea component={Link} to={`/reviews/${review.id}`} className={classes.actionArea}>
              { (productTitle && review.product) &&
                <Typography>{ review.product.name }</Typography>
              }
              <Ratings number={review.rating || 0} size='small' justify='flex-start' className={{ marginLeft: '4px' }} />
              <Typography variant='body2' className={classes.remarks}>参加日: {review.joined_at || '-'} </Typography>
              { review.result === 1 &&
                <Typography variant='body2' className={classes.remarks}>脱出成功！</Typography>
              }
              { review.result === 2 &&
                <Typography variant='body2' className={classes.remarks}>脱出失敗…</Typography>
              }
              <Typography variant='body2'>{review.contents}</Typography>
            </CardActionArea>
          }
          { !cardActionArea &&
            <Box>
              { (productTitle && review.product) &&
                <Typography>{ review.product.name }</Typography>
              }
              <Ratings number={review.rating || 0} size='small' justify='flex-start' className={{ marginLeft: '4px' }} />
              <Typography variant='body2' className={classes.remarks}>参加日: {review.joined_at || '-'} </Typography>
              { review.result === 1 &&
                <Typography variant='body2' className={classes.remarks}>脱出成功！</Typography>
              }
              { review.result === 2 &&
                <Typography variant='body2' className={classes.remarks}>脱出失敗…</Typography>
              }
              <Typography variant='body2'>{review.contents}</Typography>
            </Box>
          }
          <ProductCard product={review.product} />
        </Grid>
      }
      <Grid container justify='flex-end'>
        <Typography variant='caption' className={classes.created}>{review.created_at}</Typography>
      </Grid>
    </>
  )
}
