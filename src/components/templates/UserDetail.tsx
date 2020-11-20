import React, { FC, useState } from 'react'

import { UserDetail as UserDetailInterface, User } from '../../@types'
import { TempSpace } from '../molecules/TempSpace'
import { UserProfile } from '../organisms/UserDetail/UserProfile/'
import { UserStatics } from '../organisms/UserDetail/UserStatics/'
import { UserTabs } from '../organisms/UserDetail/UserTabs'
import { UserForm } from './UserForm'

interface Props {
    user: UserDetailInterface
    open: boolean
    setOpen: (value: boolean) => void
    name: string
    setName: (value: string) => void
    accountId: string
    setAccountId: (value: string) => void
    profile: string
    setProfile: (value: string) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    edit: () => void
    update: () => void
}

export const UserDetail: FC<Props> = ({
    user,
    open,
    setOpen,
    name,
    setName,
    accountId,
    setAccountId,
    profile,
    setProfile,
    follow,
    unfollow,
    edit,
    update,
}) => {
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
            <UserForm
                user={user}
                update={update}
                open={open}
                setOpen={setOpen}
                name={name}
                setName={setName}
                accountId={accountId}
                setAccountId={setAccountId}
                profile={profile}
                setProfile={setProfile}
            />
        </>
    )
}
