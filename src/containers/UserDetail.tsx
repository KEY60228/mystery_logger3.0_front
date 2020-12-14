import React, { FC, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState, useAppDispatch } from '../stores/index'
import {
    ReviewDetail,
    User,
    UserDetail as UserDetailInterface,
} from '../@types'
import { UserDetail as UserDetailTemp } from '../components/templates/UserDetail'
import {
    asyncGetUser,
    asyncFollow,
    asyncUnFollow,
    asyncUpdateUser,
} from '../ajax/user'
import { asyncGetCurrentUser, asyncLogout } from '../ajax/auth'
import {
    asyncDeleteReview,
    asyncLikeReview,
    asyncPostComment,
    asyncUnlikeReview,
    asyncUpdateReview,
} from '../ajax/review'

export const UserDetail: FC = () => {
    const { account_id } = useParams<{ account_id: string }>()
    const dispatch = useAppDispatch()
    const history = useHistory()

    const review = useSelector((state: RootState) => state.review.focusedReview)
    const currentUser = useSelector((state: RootState) => state.auth.user)

    const [user, setUser] = useState<UserDetailInterface | null>(null)

    const [name, setName] = useState<string>('')
    const [accountId, setAccountId] = useState<string>('')
    const [profile, setProfile] = useState<string>('')
    const [image_name, setImage_name] = useState<File|null>(null)

    const [openUserForm, setOpenUserForm] = useState<boolean>(false)

    const [spoil, setSpoil] = useState<boolean>(false)
    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string | null>('')
    const [contents, setContents] = useState<string | null>('')

    const [openReviewForm, setOpenReviewForm] = useState<boolean>(false)

    const [comment, setComment] = useState<string | null>('')

    const getUser = () => {
        dispatch(asyncGetUser(account_id, setUser))
    }

    const editUser = () => {
        if (!user) return false // 仮
        setName(user.name)
        setAccountId(user.account_id)
        setProfile(user.profile || '')
        setOpenUserForm(true)
    }

    const updateUser = () => {
        if (!user) return false // 仮

        const formData = new FormData()
        formData.append('name', name)
        formData.append('account_id', accountId)
        formData.append('profile', profile)
        if (image_name !== null) {
            formData.append('image_name', image_name)
        }

        dispatch(asyncUpdateUser(formData)).then(
            () => {
                getUser()
                setOpenUserForm(false)
            }
        ).catch(

        )
    }

    const follow = (user: User) => {
        if (!currentUser || !user) return false // 仮
        dispatch(asyncFollow(user.id)).then(
            () => dispatch(asyncGetCurrentUser())
        ).catch(

        )
    }

    const unfollow = (user: User) => {
        if (!currentUser || !user) return false // 仮
        dispatch(asyncUnFollow(user.id)).then(
            () => dispatch(asyncGetCurrentUser())
        ).catch(

        )
    }

    const editReview = () => {
        if (!review) return false // 仮
        setRating(review.rating)
        setResult(review.result)
        setJoined_at(review.joined_at)
        setContents(review.contents)
        setOpenReviewForm(true)
    }

    const updateReview = () => {
        if (!currentUser || !review) return false // 仮
        dispatch(
            asyncUpdateReview(
                review.id,
                spoil,
                rating,
                result,
                joined_at,
                contents,
            ),
        ).then(
            () => {
                getUser()
                setOpenReviewForm(false)
                setRating(0)
                setResult(0)
                setJoined_at('')
                setContents('')
            }
        ).catch(

        )
    }

    const deleteReview = () => {
        if (!review) return false // 仮
        dispatch(asyncDeleteReview(review.id)).then(
            () => {
                getUser()
                setOpenReviewForm(false)
                setRating(0)
                setResult(0)
                setJoined_at('')
                setContents('')
            }
        )
    }

    const postComment = (review: ReviewDetail) => {
        if (!currentUser || !review || !comment) return false // 仮
        dispatch(asyncPostComment(review.id, comment)).then(
            () => getUser()
        )
    }

    const likeReview = (review: ReviewDetail) => {
        if (!currentUser || !review) return false // 仮
        dispatch(asyncLikeReview(review.id)).then(
            () => {
                dispatch(asyncGetCurrentUser())
                getUser()
            }
        ).catch(

        )
    }

    const unlikeReview = (review: ReviewDetail) => {
        if (!currentUser || !review) return false // 仮
        dispatch(asyncUnlikeReview(review.id)).then(
            () => {
                dispatch(asyncGetCurrentUser())
                getUser()
            }
        ).catch(

        )
    }

    const logout = () => {
        if (!currentUser) return false // 仮
        dispatch(asyncLogout()).then(
            () => history.push('/login')
        )
    }

    useEffect(() => {
        setUser(null)
        getUser()
    }, [account_id])

    return (
        <>
            {user && (
                <>
                    <UserDetailTemp
                        user={user}
                        review={review}
                        openUserForm={openUserForm}
                        setOpenUserForm={setOpenUserForm}
                        name={name}
                        setName={setName}
                        accountId={accountId}
                        setAccountId={setAccountId}
                        profile={profile}
                        setProfile={setProfile}
                        image_name={image_name}
                        setImage_name={setImage_name}
                        follow={follow}
                        unfollow={unfollow}
                        editUser={editUser}
                        updateUser={updateUser}
                        openReviewForm={openReviewForm}
                        setOpenReviewForm={setOpenReviewForm}
                        editReview={editReview}
                        updateReview={updateReview}
                        deleteReview={deleteReview}
                        rating={rating}
                        setRating={setRating}
                        result={result}
                        setResult={setResult}
                        joined_at={joined_at}
                        setJoined_at={setJoined_at}
                        spoil={spoil}
                        setSpoil={setSpoil}
                        contents={contents}
                        setContents={setContents}
                        comment={comment}
                        setComment={setComment}
                        postComment={postComment}
                        likeReview={likeReview}
                        unlikeReview={unlikeReview}
                        logout={logout}
                    />
                </>
            )}
            {!user && <div>loading</div>}
        </>
    )
}
