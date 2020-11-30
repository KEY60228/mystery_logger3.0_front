import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { CommentDetail } from '../../../../@types'
import { CommentCard } from './CommentCard'

interface Props {
    comments: CommentDetail[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    }),
)

export const ReviewComments: FC<Props> = ({ comments }) => {
    const classes = useStyles()

    return (
        <>
            {comments.map((comment: CommentDetail) => (
                <CommentCard key={comment.id} comment={comment} />
            ))}
        </>
    )
}
