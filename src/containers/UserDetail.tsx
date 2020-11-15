import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../stores/index'
import { UserDetail as UserDetailInterface, User } from '../@types'
import { UserDetail as UserDetailTemp } from '../components/templates/UserDetail'
import { asyncGetUser, asyncFollow, asyncUnFollow } from '../ajax/user'
import { asyncGetCurrentUser } from '../ajax/auth'
import { setFollowStatus } from '../stores/user'
import { setFocusedProduct } from '../stores/product'
import { setFocusedReview } from '../stores/review'
import { UserForm } from '../components/templates/UserForm'

export const UserDetail: FC = () => {
    const dispatch = useDispatch()

    const { account_id } = useParams<{ account_id: string }>()

    const [user, setUser] = useState<UserDetailInterface | null>(null)
    const [open, setOpen] = useState<boolean>(false)

    const currentUser = useSelector((state: RootState) => state.auth.user)
    const followStatus = useSelector((state: RootState) => state.user.followStatus)

    const getUser = () => {
        dispatch(asyncGetUser(account_id, setUser))
    }

    const update = () => {
        return false // 仮
    }

    const follow = (user: User) => {
        if (!currentUser || !user) return false
        dispatch(asyncFollow(currentUser.id, user.id))
    }
    
    const unfollow = (user: User) => {
        if(!currentUser || !user) return false
        dispatch(asyncUnFollow(currentUser.id, user.id))
    }

    useEffect(() => {
        getUser()
        
        return () => {
            dispatch(setFocusedProduct(null))
            dispatch(setFocusedReview(null))
        }
    }, [])

    useEffect(() => {
        if (followStatus) {
            dispatch(asyncGetCurrentUser())
            dispatch(setFollowStatus(null))
        }
    }, [followStatus])

    return (
        <>
            { user && 
                <>
                    <UserDetailTemp user={user} follow={follow} unfollow={unfollow} setOpen={setOpen} />
                    <UserForm user={user} update={update} open={open} setOpen={setOpen} />
                </>
            }
            {!user && <div>loading</div>}
        </>
    )
}
