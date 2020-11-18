import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../stores/index'
import { UserDetail as UserDetailInterface, User } from '../@types'
import { UserDetail as UserDetailTemp } from '../components/templates/UserDetail'
import { asyncGetUser, asyncFollow, asyncUnFollow, asyncUpdateUser } from '../ajax/user'
import { asyncGetCurrentUser } from '../ajax/auth'
import { setFollowStatus, setUpdateUserStatus } from '../stores/user'
import { setFocusedProduct } from '../stores/product'
import { setFocusedReview } from '../stores/review'
import { UserForm } from '../components/templates/UserForm'

export const UserDetail: FC = () => {
    const dispatch = useDispatch()

    const { account_id } = useParams<{ account_id: string }>()
    
    const currentUser = useSelector((state: RootState) => state.auth.user)
    const followStatus = useSelector((state: RootState) => state.user.followStatus)
    const updateUserStatus = useSelector((state: RootState) => state.user.updateUserStatus)

    const [user, setUser] = useState<UserDetailInterface | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [accountId, setAccountId] = useState<string>('')
    const [profile, setProfile] = useState<string>('')
    const setModalOpen = (value: boolean) => {
        if (!user) return false
        setName(user.name)
        setAccountId(user.account_id)
        setProfile(user.profile || '')
        setOpen(value)
    }

    const getUser = () => {
        dispatch(asyncGetUser(account_id, setUser))
    }

    const update = async(id: number) => {
        dispatch(asyncUpdateUser(id, name, accountId, profile))
        setModalOpen(false)
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
    
    useEffect(() => {
        if (updateUserStatus) {
            getUser()
            dispatch(setUpdateUserStatus(null))
        }
    }, [updateUserStatus])

    return (
        <>
            { user && 
                <>
                    <UserDetailTemp user={user} follow={follow} unfollow={unfollow} setOpen={setModalOpen} />
                    <UserForm
                        user={user}
                        update={update}
                        open={open}
                        setOpen={setModalOpen}
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
