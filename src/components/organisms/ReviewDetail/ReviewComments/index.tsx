import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { ReviewComment, User } from '../../../../@types'
import { CommentCard } from './CommentCard'

interface ReviewCommentWithUser extends ReviewComment {
    user: User
}

interface Props {
    comments: ReviewCommentWithUser[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    }),
)

export const ReviewComments: FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            {props.comments.map(comment => (
                <CommentCard key={comment.id} comment={comment} />
            ))}
        </>
    )
}
