import React, { FC, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
    ReviewDetail,
    User,
    UserContents,
    UserDetail as UserDetailInterface,
} from '../../@types'
import {
    asyncGetUser,
    asyncFollow,
    asyncUnFollow,
    asyncUpdateUser,
} from '../../ajax/user'
import { asyncGetCurrentUser, asyncLogout } from '../../ajax/auth'
import {
    asyncDeleteReview,
    asyncLikeReview,
    asyncPostComment,
    asyncUnlikeReview,
    asyncUpdateReview,
} from '../../ajax/review'
import { RootState, useAppDispatch } from '../../stores/index'
import { setPopper } from '../../stores/error'
import { setUser as setCurrentUser } from '../../stores/auth'

import { UserDetailTemplate as Template } from './layout'
import { CircularLoader } from '../../_reusable/Loader/CircularLoader'

export const UserDetail: FC = () => {
    const { account_id } = useParams<{ account_id: string }>()
    const dispatch = useAppDispatch()
    const history = useHistory()

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const [user, setUser] = useState<UserDetailInterface | null>(null)
    const [review, setReview] = useState<ReviewDetail | null>(null)

    // ユーザープロフィール
    const [userFormOpen, setUserFormOpen] = useState<boolean>(false)
    const [userContents, setUserContents] = useState<UserContents>({
        name: '',
        account_id: '',
        profile: '',
    })
    const [image_name, setImage_name] = useState<File|null>(null)


    // const [spoil, setSpoil] = useState<boolean>(false)
    // const [rating, setRating] = useState<number>(0)
    // const [result, setResult] = useState<number>(0)
    // const [joined_at, setJoined_at] = useState<Date | null>(null)
    // const [contents, setContents] = useState<string | null>('')

    // const [openReviewForm, setOpenReviewForm] = useState<boolean>(false)

    // const [comment, setComment] = useState<string | null>('')

    const editUser = () => {
        if (!user) return false
        setUserContents({
            name: user.name,
            account_id: user.account_id,
            profile: user.profile || '',
        })
        setUserFormOpen(true)
    }

    const updateUser = () => {
        if (!user) return false

        const formData = new FormData()
        formData.append('name', userContents.name)
        formData.append('account_id', userContents.account_id)
        formData.append('profile', userContents.profile)
        if (image_name !== null) {
            formData.append('image_name', image_name)
        }

        dispatch(asyncUpdateUser(formData))
            .then(() => {
                if (user.account_id === userContents.account_id) {
                    dispatch(asyncGetCurrentUser())
                    getUser()
                } else {
                    dispatch(asyncGetCurrentUser())
                    history.push(`/users/${userContents.account_id}`)
                }
                setUserFormOpen(false)
            })
            .catch(() => {return})
    }

    const follow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!user) return false

        // 楽観的更新(currentUser)
        dispatch(
            setCurrentUser(
                Object.assign({}, currentUser, {
                    follows_id: currentUser.follows_id.concat([user.id]),
                }),
            ),
        )

        // 楽観的更新(user)
        setUser((prev: UserDetailInterface) => ({...prev, followers_count: user.followers_count + 1}))

        dispatch(asyncFollow(user.id))
            .then(() => {
                getUser()
                dispatch(asyncGetCurrentUser())
            })
            .catch(() => {return})
    }

    const unfollow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!user) return false

        // 楽観的更新(currentUser)
        const follows_id = currentUser.follows_id.filter(el => {
            return el !== user.id
        })
        dispatch(
            setCurrentUser(
                Object.assign({}, currentUser, { follows_id: follows_id }),
            ),
        )

        // 楽観的更新(user)
        setUser((prev: UserDetailInterface) => ({...prev, followers_count: user.followers_count - 1}))

        dispatch(asyncUnFollow(user.id))
            .then(() => {
                getUser()
                dispatch(asyncGetCurrentUser())
            })
            .catch(() => {return})
    }

    const logout = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        dispatch(asyncLogout()).then(() => history.push('/login')).catch(() => {return})
    }

    const getUser = () => {
        dispatch(asyncGetUser(account_id)).then(
            result => setUser(result)
        ).catch(() => {return})
    }

    useEffect(() => {
        setUser(null)
        getUser()
    }, [account_id])

    return (
        <>
            <Helmet>
                <title>ユーザー情報 - なぞログ</title>
            </Helmet>
            {user && (
                <>
                    <Template
                        user={user}
                        userFormOpen={userFormOpen}
                        setUserFormOpen={setUserFormOpen}
                        userContents={userContents}
                        setUserContents={setUserContents}
                        image_name={image_name}
                        setImage_name={setImage_name}
                        editUser={editUser}
                        updateUser={updateUser}
                        follow={follow}
                        unfollow={unfollow}
                        logout={logout}
                    />
                </>
            )}
            {!user && <CircularLoader />}
        </>
    )
}
