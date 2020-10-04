import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

interface Props {
  text: string
  className?: ClassProps
}

interface ClassProps {
  fontSize?: string
  width?: string
  height?: string
  margin?: string
}

const useStyles = makeStyles((theme:Theme) => 
  createStyles({
    root: (className: ClassProps) => ({
      width: className.width || '350px',
      height: className.height || '250px',
      border: '1px solid black',
      margin: className.margin || '12px auto',
    }),
    text: (className: ClassProps) => ({
      textAlign: 'center',
      lineHeight: className.height || '250px',
      fontSize: className.fontSize || '32px',
    })
  })
)

export const TempSpace: FC<Props> = ({
  text, className
}) => {
  const classes = useStyles(className)

  return (
    <Box className={classes.root}>
      <Typography variant='h3' className={classes.text}>{text}</Typography>
    </Box>
  )
}