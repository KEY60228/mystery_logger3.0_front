import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid } from '@material-ui/core'

import { User } from '../@types'
import { SuccessRateByCategory as CategoryStatics } from '../molecules/SuccessRateByCategory'

interface Props {
  // user: User
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
  })
)

export const UserStatics: FC<Props> = ({
  className
}) => {
  const classes = useStyles(className)

  return (
    <Card className={classes.root}>
      <Grid container justify='center' alignItems='center'>
        <CategoryStatics />
      </Grid>
    </Card>
  )
}
