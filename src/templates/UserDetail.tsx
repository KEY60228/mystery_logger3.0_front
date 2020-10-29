import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { UserDetail as UserDetailInterface } from '../@types'
import { UserProfile } from '../organisms/UserProfile'
import { UserStatics } from '../organisms/UserStatics'
import { UserTabs } from '../organisms/UserTabs'
import { TempSpace } from '../organisms/TempSpace'

interface Props {
  user: UserDetailInterface
  follow: () => void
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({

  })
)

export const UserDetail: FC<Props> = ({
  user, follow
}) => {
  const classes = useStyles()

  return (
    <>
      <UserProfile user={user} follow={follow} />
      <UserStatics />
      <UserTabs user={user} />
      <TempSpace text='Ad Space' className={{height: '320px', margin:'12px auto 60px'}} />
    </>
  )
}