import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { UserDetail as UserDetailInterface, User } from '../../@types'
import { UserProfile } from '../organisms/UserProfile/index'
import { UserStatics } from '../organisms/UserStatics/index'
import { UserTabs } from '../organisms/UserTabs'
import { TempSpace } from '../molecules/TempSpace'

interface Props {
    user: UserDetailInterface
    follow: (user: User) => void
    unfollow: (user: User) => void
    setOpen: (value: boolean) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export const UserDetail: FC<Props> = ({ user, follow, unfollow, setOpen }) => {
    const classes = useStyles()

    const [confirmOpen, setConfirmOpen] = useState<boolean>(false) // 仮

    return (
        <>
            <UserProfile user={user} follow={follow} unfollow={unfollow} setOpen={setOpen} />
            <UserStatics />
            <UserTabs user={user} follow={follow} unfollow={unfollow} setConfirmOpen={setConfirmOpen} />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
        </>
    )
}
