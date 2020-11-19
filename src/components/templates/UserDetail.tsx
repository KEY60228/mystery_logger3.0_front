import React, { FC, useState } from 'react'

import { UserDetail as UserDetailInterface, User } from '../../@types'
import { TempSpace } from '../molecules/TempSpace'
import { UserProfile } from '../organisms/UserDetail/UserProfile/'
import { UserStatics } from '../organisms/UserDetail/UserStatics/'
import { UserTabs } from '../organisms/UserDetail/UserTabs'

interface Props {
    user: UserDetailInterface
    follow: (user: User) => void
    unfollow: (user: User) => void
    edit: () => void
}

export const UserDetail: FC<Props> = ({ user, follow, unfollow, edit }) => {
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false) // 仮

    return (
        <>
            <UserProfile user={user} follow={follow} unfollow={unfollow} edit={edit} />
            <UserStatics />
            <UserTabs user={user} follow={follow} unfollow={unfollow} setConfirmOpen={setConfirmOpen} />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
        </>
    )
}
