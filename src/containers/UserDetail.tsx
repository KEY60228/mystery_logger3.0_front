import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
import { asyncGetCurrentUser } from '../ajax/auth'
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

    const review = useSelector((state: RootState) => state.review.focusedReview)
    const currentUser = useSelector((state: RootState) => state.auth.user)
    const updateUserStatus = useSelector(
        (state: RootState) => state.user.updateUserStatus,
    )

    const [user, setUser] = useState<UserDetailInterface | null>(null)

    const [name, setName] = useState<string>('')
    const [accountId, setAccountId] = useState<string>('')
    const [profile, setProfile] = useState<string>('')

    const [openUserForm, setOpenUserForm] = useState<boolean>(false)

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
        dispatch(asyncUpdateUser(user.id, name, accountId, profile))
        setOpenUserForm(false)
    }

    const follow = (user: User) => {
        if (!currentUser || !user) return false // 仮
        dispatch(asyncFollow(currentUser.id, user.id)).then(
            () => dispatch(asyncGetCurrentUser())
        ).catch(

        )
    }

    const unfollow = (user: User) => {
        if (!currentUser || !user) return false // 仮
        dispatch(asyncUnFollow(currentUser.id, user.id)).then(
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
                rating,
                result,
                joined_at,
                contents,
                currentUser.id,
                review.product.id,
                review.id,
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
        dispatch(asyncPostComment(currentUser.id, review.id, comment)).then(
            () => getUser()
        )
    }

    const likeReview = (review: ReviewDetail) => {
        if (!currentUser || !review) return false // 仮
        dispatch(asyncLikeReview(currentUser.id, review.id)).then(
            () => {
                dispatch(asyncGetCurrentUser())
                getUser()
            }
        ).catch(

        )
    }

    const unlikeReview = (review: ReviewDetail) => {
        if (!currentUser || !review) return false // 仮
        dispatch(asyncUnlikeReview(currentUser.id, review.id)).then(
            () => {
                dispatch(asyncGetCurrentUser())
                getUser()
            }
        ).catch(

        )
    }

    useEffect(() => {
        setUser(null)
        getUser()
    }, [account_id])

    useEffect(() => {
        if (updateUserStatus) {
            getUser()
        }
    }, [updateUserStatus])

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
                        contents={contents}
                        setContents={setContents}
                        comment={comment}
                        setComment={setComment}
                        postComment={postComment}
                        likeReview={likeReview}
                        unlikeReview={unlikeReview}
                    />
                </>
            )}
            {!user && <div>loading</div>}
        </>
    )
}
