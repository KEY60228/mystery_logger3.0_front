import React, { FC, useState } from 'react'

import { UserDetail as UserDetailInterface, User, ReviewDetail } from '../../@types'
import { TempSpace } from '../molecules/TempSpace'
import { UserProfile } from '../organisms/UserDetail/UserProfile/'
import { UserStatics } from '../organisms/UserDetail/UserStatics/'
import { UserTabs } from '../organisms/UserDetail/UserTabs'
import { UserForm } from '../organisms/UserDetail/UserForm/'
import { FollowList } from '../organisms/UserDetail/FollowList/'
import { ReviewForm } from '../molecules/ReviewForm'
import { ConfirmDeleteReview } from '../molecules/ConfirmDeleteReview'

interface Props {
    user: UserDetailInterface
    review: ReviewDetail | null
    openUserForm: boolean
    setOpenUserForm: (value: boolean) => void
    name: string
    setName: (value: string) => void
    accountId: string
    setAccountId: (value: string) => void
    profile: string
    setProfile: (value: string) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    editUser: () => void
    updateUser: () => void
    openReviewForm: boolean
    setOpenReviewForm: (value: boolean) => void
    editReview: () => void
    updateReview: () => void
    deleteReview: () => void
    rating: number
    setRating: (value: number) => void
    result: number
    setResult: (value: number) => void
    joined_at: string | null
    setJoined_at: (value: string | null) => void
    contents: string | null
    setContents: (value: string | null) => void
    comment: string | null
    setComment: (value: string) => void
    postComment: (review: ReviewDetail) => void
    likeReview: (review: ReviewDetail) => void
    unlikeReview: (review: ReviewDetail) => void
}

export const UserDetail: FC<Props> = ({
    user,
    review,
    openUserForm,
    setOpenUserForm,
    name,
    setName,
    accountId,
    setAccountId,
    profile,
    setProfile,
    follow,
    unfollow,
    editUser,
    updateUser,
    openReviewForm,
    setOpenReviewForm,
    editReview,
    updateReview,
    deleteReview,
    rating,
    setRating,
    result,
    setResult,
    joined_at,
    setJoined_at,
    contents,
    setContents,
    comment,
    setComment,
    postComment,
    likeReview,
    unlikeReview
}) => {
    const [followsOpen, setFollowsOpen] = useState<boolean>(false)
    const [followerOpen, setFollowerOpen] = useState<boolean>(false)
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
    const [commentOpen, setCommentOpen] = useState<number | false>(false)

    return (
        <>
            <UserProfile
                user={user}
                follow={follow}
                unfollow={unfollow}
                edit={editUser}
                setFollowsOpen={setFollowsOpen}
                setFollowerOpen={setFollowerOpen}
            />
            <UserStatics />
            <UserTabs
                user={user}
                follow={follow}
                unfollow={unfollow}
                setConfirmOpen={setConfirmOpen}
                editReview={editReview}
                comment={comment}
                setComment={setComment}
                postComment={postComment}
                likeReview={likeReview}
                unlikeReview={unlikeReview}
                commentOpen={commentOpen}
                setCommentOpen={setCommentOpen}
            />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
            <UserForm
                user={user}
                update={updateUser}
                open={openUserForm}
                setOpen={setOpenUserForm}
                name={name}
                setName={setName}
                accountId={accountId}
                setAccountId={setAccountId}
                profile={profile}
                setProfile={setProfile}
            />
            { review &&
                <ReviewForm
                    open={openReviewForm}
                    setOpen={setOpenReviewForm}
                    rating={rating}
                    setRating={setRating}
                    result={result}
                    setResult={setResult}
                    joined_at={joined_at}
                    setJoined_at={setJoined_at}
                    contents={contents}
                    setContents={setContents}
                    update={updateReview}
                    isNew={false}
                    product={review.product}
                />
            }
            <FollowList
                follows={user.follows}
                label='フォローしている人'
                open={followsOpen}
                setOpen={setFollowsOpen}
                follow={follow}
                unfollow={unfollow}
            />
            <FollowList
                follows={user.followers}
                label='フォローされている人'
                open={followerOpen}
                setOpen={setFollowerOpen}
                follow={follow}
                unfollow={unfollow}
            />
            <ConfirmDeleteReview
                deleteReview={deleteReview}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
        </>
    )
}
