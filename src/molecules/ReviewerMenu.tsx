import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { useDispatch } from 'react-redux'
import { setFocusedReview } from '../stores/review'

import { Review, User, Product } from '../@types'

interface ReviewDetail extends Review {
    user?: User
    product?: Product
}

interface Props {
    review: ReviewDetail
    setOpen: (value: boolean) => void
    setRating: (value: number) => void
    setResult: (value: number) => void
    setJoined_at: (value: string|null) => void
    setContents: (value: string|null) => void
    setIsEdit: (value: boolean) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        }
    })
)

export const ReviewerMenu: FC<Props> = ({
    review, setOpen, setRating, setResult, setJoined_at, setContents, setIsEdit, className
}) => {
    const classes = useStyles(className)
    const [menu, setMenu] = useState<null|HTMLElement>(null)
    const dispatch = useDispatch()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenu(event.currentTarget);
    };

    const editReview = () => {
        dispatch(setFocusedReview(review))

        setIsEdit(true)
        setRating(review.rating)
        setResult(review.result)
        setJoined_at(review.joined_at)
        setContents(review.contents)
        setMenu(null)
        setOpen(true)
    }

    const deleteReview = () => {
        setMenu(null)
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>
            <Menu anchorEl={menu} open={Boolean(menu)} onClose={() => setMenu(null)}>
                <MenuItem onClick={editReview}>編集する</MenuItem>
                <MenuItem onClick={deleteReview}>削除する</MenuItem>
            </Menu>
        </>
    )
}

