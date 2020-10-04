import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Button, Typography } from '@material-ui/core'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'

interface Props {
  number: number
  onClick: (value: boolean) => void
  iconSize?: 'default'
  | 'inherit'
  | 'large'
  | 'small'
  className?: ClassProps
}

interface ClassProps {
  width?: string
  height?: string
  fontSize?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (className: ClassProps) => ({
      width: className.width,
      height: className.height,
    }),
    text: (className: ClassProps) => ({
      fontSize: className.fontSize,
    }),
  })
)

export const DoneButton: FC<Props> = ({
  number, onClick, iconSize, className
}) => {
  const classes = useStyles(className)

  return (
    <Button
      onClick={() => onClick(true)}
      className={classes.root}
      color='primary'
      variant='contained'
    >
      <Grid container direction='column' justify='center' alignItems='center'>
        <DirectionsRunIcon fontSize={iconSize}/>
        <Typography variant='caption' className={classes.text}>{number}</Typography>
      </Grid>
    </Button>
  )
}