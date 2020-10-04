import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import StarRateIcon from '@material-ui/icons/StarRate'

interface Props {
  number: number|string
  iconSize?: 'default'
  | 'inherit'
  | 'large'
  | 'small'
  className?: ClassProps
}

interface ClassProps {
  width?: string
  fontSize?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (className: ClassProps) => ({
      width: className.width,
    }),
    text: (className: ClassProps) => ({
      fontSize: className.fontSize,
    }),
  })
)

export const RatingCounter: FC<Props> = ({
  number, iconSize, className
}) => {
  const classes = useStyles(className)

  return (
    <Grid 
      container
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.root}
    >
      <StarRateIcon color='primary' fontSize={iconSize} />
      <Typography variant='caption'  className={classes.text}>
        {number}
      </Typography>
    </Grid>
  )
}