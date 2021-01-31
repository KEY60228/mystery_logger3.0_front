import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import { Review, User, Product } from '../../../@types'

interface ReviewDetail extends Review {
    user?: User
    product?: Product
}

interface Props {
    review: ReviewDetail
    edit: (value: ReviewDetail) => void
    setConfirmOpen: (value: boolean) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    }),
)

export const ReviewerMenu: FC<Props> = props => {
    const classes = useStyles(props.className)
    const [menu, setMenu] = useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenu(event.currentTarget)
    }

    const editReview = () => {
        props.edit(props.review)
        setMenu(null)
    }

    const deleteReview = () => {
        props.setConfirmOpen(true)
        setMenu(null)
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>
            <Menu
                anchorEl={menu}
                open={Boolean(menu)}
                onClose={() => setMenu(null)}
            >
                <MenuItem onClick={editReview}>編集する</MenuItem>
                <MenuItem onClick={deleteReview}>削除する</MenuItem>
            </Menu>
        </>
    )
}
