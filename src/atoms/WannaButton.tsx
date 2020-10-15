import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Button, Typography } from '@material-ui/core'
import QueueIcon from '@material-ui/icons/Queue'

interface Props {
  number: number
  onClick: (value: boolean) => void
  wanna: boolean
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
  margin?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (className: ClassProps) => ({
      width: className.width,
      height: className.height,
      margin: className.margin,
    }),
    text: (className: ClassProps) => ({
      fontSize: className.fontSize,
    }),
  })
)

export const WannaButton: FC<Props> = ({
  number, onClick, wanna, iconSize, className
}) => {
  const classes = useStyles(className)

  return (
    <Button
      onClick={() => onClick(!wanna)}
      className={classes.root}
      color='primary'
      variant='contained'
    >
      <Grid container direction='column' justify='center' alignItems='center'>
        <QueueIcon fontSize={iconSize}/>
        <Typography variant='caption' className={classes.text}>{number}</Typography>
      </Grid>
    </Button>
  )
}