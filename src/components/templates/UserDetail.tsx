import React, { FC, useState } from 'react'

import {
    UserDetail as UserDetailInterface,
    User,
    ReviewDetail,
} from '../../@types'
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
    spoil: boolean
    setSpoil: (value: boolean) => void
    contents: string | null
    setContents: (value: string | null) => void
    comment: string | null
    setComment: (value: string) => void
    postComment: (review: ReviewDetail) => void
    likeReview: (review: ReviewDetail) => void
    unlikeReview: (review: ReviewDetail) => void
}

export const UserDetail: FC<Props> = props => {
    const [followsOpen, setFollowsOpen] = useState<boolean>(false)
    const [followerOpen, setFollowerOpen] = useState<boolean>(false)
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
    const [commentOpen, setCommentOpen] = useState<number | false>(false)

    return (
        <>
            <UserProfile
                user={props.user}
                follow={props.follow}
                unfollow={props.unfollow}
                edit={props.editUser}
                setFollowsOpen={setFollowsOpen}
                setFollowerOpen={setFollowerOpen}
            />
            <UserStatics
                user={props.user}
            />
            <UserTabs
                user={props.user}
                follow={props.follow}
                unfollow={props.unfollow}
                setConfirmOpen={setConfirmOpen}
                editReview={props.editReview}
                comment={props.comment}
                setComment={props.setComment}
                postComment={props.postComment}
                likeReview={props.likeReview}
                unlikeReview={props.unlikeReview}
                commentOpen={commentOpen}
                setCommentOpen={setCommentOpen}
            />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
            <UserForm
                user={props.user}
                update={props.updateUser}
                open={props.openUserForm}
                setOpen={props.setOpenUserForm}
                name={props.name}
                setName={props.setName}
                accountId={props.accountId}
                setAccountId={props.setAccountId}
                profile={props.profile}
                setProfile={props.setProfile}
            />
            {props.review && (
                <ReviewForm
                    open={props.openReviewForm}
                    setOpen={props.setOpenReviewForm}
                    rating={props.rating}
                    setRating={props.setRating}
                    result={props.result}
                    setResult={props.setResult}
                    joined_at={props.joined_at}
                    setJoined_at={props.setJoined_at}
                    spoil={props.spoil}
                    setSpoil={props.setSpoil}
                    contents={props.contents}
                    setContents={props.setContents}
                    update={props.updateReview}
                    isNew={false}
                    product={props.review.product}
                />
            )}
            <FollowList
                follows={props.user.follows}
                label="フォローしている人"
                open={followsOpen}
                setOpen={setFollowsOpen}
                follow={props.follow}
                unfollow={props.unfollow}
            />
            <FollowList
                follows={props.user.followers}
                label="フォローされている人"
                open={followerOpen}
                setOpen={setFollowerOpen}
                follow={props.follow}
                unfollow={props.unfollow}
            />
            <ConfirmDeleteReview
                deleteReview={props.deleteReview}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
        </>
    )
}
