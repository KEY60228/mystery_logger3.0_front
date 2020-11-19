import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { Product } from '../../@types'
import { ReviewForm as ReviewFormMod } from '../molecules/ReviewForm/'

interface Props {
    open: boolean
    setOpen: (value: boolean) => void
    rating: number
    setRating: (value: number) => void
    result: number
    setResult: (value: number) => void
    joined_at: string | null
    setJoined_at: (value: string | null) => void
    contents: string | null
    setContents: (value: string | null) => void
    product: Product
    post?: () => void
    update: () => void
    isNew: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    }),
)

export const ReviewForm: FC<Props> = ({
    open,
    setOpen,
    rating,
    setRating,
    result,
    setResult,
    joined_at,
    setJoined_at,
    contents,
    setContents,
    post,
    update,
    isNew,
    product,
}) => {
    const classes = useStyles()

    return (
        <ReviewFormMod
            open={open}
            setOpen={setOpen}
            rating={rating}
            setRating={setRating}
            result={result}
            setResult={setResult}
            joined_at={joined_at}
            setJoined_at={setJoined_at}
            contents={contents}
            setContents={setContents}
            post={post}
            update={update}
            isNew={isNew}
            product={product}
        />
    )
}
