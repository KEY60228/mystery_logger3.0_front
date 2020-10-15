import React, { FC  } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'

interface Props {
  number: number
  size?: 'large'
  | 'medium'
  | 'small'
  justify?: 'flex-start'
  className?: ClassProps
}

interface ClassProps {
  width?: string
  fontSize?: string
  marginLeft?: string
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: (className: ClassProps) => ({
      width: className.width
    }),
    text: (className: ClassProps) => ({
      fontSize: className.fontSize,
      marginLeft: className.marginLeft
    })
  })
)

export const Ratings: FC<Props> =({
  number, size, justify, className
}) => {
  const classes = useStyles(className)
  
  return (
    <Grid container justify={justify || 'center'} alignItems='center' className={classes.root}>
      <Rating
        value={number == 0 ? 0 : parseFloat(number.toFixed(1))}
        precision={0.1}
        readOnly
        size={size}
      />
      <Typography variant='caption' className={classes.text}>
        {number == 0 ? '-' : number.toFixed(1)}
      </Typography>
    </Grid>
  )
}