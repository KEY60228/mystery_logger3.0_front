import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../stores'
import { DeletedReviewPop } from './DeletedReviewPopper'
import { LoginPop } from './LoginPop'
import { LogoutPop } from './LogoutPop'
import { PostedReviewPop } from './PostedReviewPop'
import { UnauthPop } from './UnauthPop'
import { UndonePop } from './UndonePop'
import { PostedUserPop } from './PostedUserPop'
import { CommentPop } from './CommentPop'
import { SessionoutPop } from './SessionoutPop'

export const PopHandler: FC = () => {
    const popper = useSelector((state: RootState) => state.error.popper)

    const [loginOpen, setLoginOpen] = useState<boolean>(false)
    const [logoutOpen, setLogoutOpen] = useState<boolean>(false)
    const [unauthOpen, setUnauthOpen] = useState<boolean>(false)
    const [undoneOpen, setUndoneOpen] = useState<boolean>(false)
    const [postedReviewOpen, setPostedReviewOpen] = useState<boolean>(false)
    const [deletedReviewOpen, setDeletedReviewOpen] = useState<boolean>(false)
    const [postedUserOpen, setPostedUserOpen] = useState<boolean>(false)
    const [commentOpen, setCommentOpen] = useState<boolean>(false)
    const [sessionoutOpen, setSessionoutOpen] = useState<boolean>(false)
    const [badRequestOpen, setBadRequestOpen] = useState<boolean>(false)

    useEffect(() => {
        switch (popper) {
            case 'login':
                setLoginOpen(true)
                break
            case 'logout':
                setLogoutOpen(true)
                break
            case 'unauthenticated':
                setUnauthOpen(true)
                break
            case 'undone':
                setUndoneOpen(true)
                break
            case 'posted review':
                setPostedReviewOpen(true)
                break
            case 'deleted review':
                setDeletedReviewOpen(true)
                break
            case 'posted user':
                setPostedUserOpen(true)
                break
            case 'commented':
                setCommentOpen(true)
                break
            case 'bad request':
                setBadRequestOpen(true)
                break
            case 'session out':
                setSessionoutOpen(true)
                break
            default:
                break
        }
    }, [popper])

    return (
        <>
            <LoginPop open={loginOpen} setOpen={setLoginOpen} />
            <LogoutPop open={logoutOpen} setOpen={setLogoutOpen} />
            <UnauthPop open={unauthOpen} setOpen={setUnauthOpen} />
            <UndonePop open={undoneOpen} setOpen={setUndoneOpen} />
            <PostedReviewPop
                open={postedReviewOpen}
                setOpen={setPostedReviewOpen}
            />
            <DeletedReviewPop
                open={deletedReviewOpen}
                setOpen={setDeletedReviewOpen}
            />
            <PostedUserPop open={postedUserOpen} setOpen={setPostedUserOpen} />
            <CommentPop open={commentOpen} setOpen={setCommentOpen} />
            <SessionoutPop open={sessionoutOpen} setOpen={setSessionoutOpen} />
        </>
    )
}
