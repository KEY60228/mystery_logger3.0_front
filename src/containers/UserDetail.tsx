import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../stores/index'
import { UserDetail as UserDetailInterface } from '../@types'
import { UserDetail as UserDetailTemp } from '../components/templates/UserDetail'
import { asyncGetUser, asyncFollow, asyncUnFollow } from '../ajax/user'

export const UserDetail: FC = () => {
    const dispatch = useDispatch()

    const { account_id } = useParams<{ account_id: string }>()

    const [user, setUser] = useState<UserDetailInterface | null>(null)

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const getUser = () => {
        dispatch(asyncGetUser(account_id, setUser))
    }

    const follow = () => {
        if (!currentUser || !user) return false
        dispatch(asyncFollow(currentUser.id, user.id))
    }
    
    const unfollow = () => {
        if(!currentUser || !user) return false
        dispatch(asyncUnFollow(currentUser.id, user.id))
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            {user && <UserDetailTemp user={user} follow={follow} unfollow={unfollow} />}
            {!user && <div>loading</div>}
        </>
    )
}
