import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../stores/index'
import { UserDetail as UserDetailInterface, User } from '../@types'
import { UserDetail as UserDetailTemp } from '../components/templates/UserDetail'
import { asyncGetUser, asyncFollow, asyncUnFollow, asyncUpdateUser } from '../ajax/user'
import { asyncGetCurrentUser } from '../ajax/auth'
import { UserForm } from '../components/templates/UserForm'

export const UserDetail: FC = () => {
    const { account_id } = useParams<{ account_id: string }>()
    const dispatch = useDispatch()

    const currentUser = useSelector((state: RootState) => state.auth.user)
    const followStatus = useSelector((state: RootState) => state.user.followStatus)
    const updateUserStatus = useSelector((state: RootState) => state.user.updateUserStatus)

    const [user, setUser] = useState<UserDetailInterface | null>(null)

    const [name, setName] = useState<string>('')
    const [accountId, setAccountId] = useState<string>('')
    const [profile, setProfile] = useState<string>('')

    const [open, setOpen] = useState<boolean>(false)

    const getUser = () => {
        dispatch(asyncGetUser(account_id, setUser))
    }

    const edit = () => {
        if (!user) return false // 仮
        setName(user.name)
        setAccountId(user.account_id)
        setProfile(user.profile || '')
        setOpen(true)
    }

    const update = () => {
        if (!user) return false // 仮
        dispatch(asyncUpdateUser(user.id, name, accountId, profile))
        setOpen(false)
    }

    const follow = () => {
        if (!currentUser || !user) return false // 仮
        dispatch(asyncFollow(currentUser.id, user.id))
    }
    
    const unfollow = () => {
        if(!currentUser || !user) return false // 仮
        dispatch(asyncUnFollow(currentUser.id, user.id))
    }

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if (followStatus) {
            dispatch(asyncGetCurrentUser())
        }
    }, [followStatus])
    
    useEffect(() => {
        if (updateUserStatus) {
            getUser()
        }
    }, [updateUserStatus])

    return (
        <>
            { user && 
                <>
                    <UserDetailTemp user={user} follow={follow} unfollow={unfollow} edit={edit} />
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
            }
            {!user && <div>loading</div>}
        </>
    )
}
