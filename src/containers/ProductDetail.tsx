import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { ReviewDetail } from '../@types'
import { RootState } from '../stores/index'
import { setFocusedProduct } from '../stores/product'
import { setFocusedReview } from '../stores/review'
import { asyncGetProduct } from '../ajax/product'
import { asyncPostReview, asyncUpdateReview } from '../ajax/review'
import { ProductDetail as ProductDetailTemp } from '../components/templates/ProductDetail'
import { ReviewForm } from '../components/templates/ReviewForm'

export const ProductDetail: FC = () => {
    const dispatch = useDispatch()
    const { id } = useParams<{ id: string }>()

    const postStatus = useSelector(
        (state: RootState) => state.review.postStatus,
    )
    const product = useSelector(
        (state: RootState) => state.product.focusedProduct,
    )
    const review = useSelector((state: RootState) => state.review.focusedReview)
    const user = useSelector((state: RootState) => state.auth.user)

    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string | null>('')
    const [contents, setContents] = useState<string | null>('')

    // 投稿フォームの開閉
    const [open, setOpen] = useState<boolean>(false)
    // 新規投稿 or 編集
    const [isNew, setIsNew] = useState<boolean>(false)

    const getProduct = () => {
        dispatch(asyncGetProduct(id))
    }

    const post = () => {
        if (!user || !product) return false
        dispatch(
            asyncPostReview(
                rating,
                result,
                joined_at,
                contents,
                user.id,
                product.id,
            ),
        )
    }

    const edit = (review: ReviewDetail) => {
        dispatch(setFocusedReview(review))
        setRating(review.rating)
        setResult(review.result)
        setJoined_at(review.joined_at)
        setContents(review.contents)
        setOpen(true)
    }

    const update = () => {
        if (!user || !product || !review) return false
        dispatch(
            asyncUpdateReview(
                rating,
                result,
                joined_at,
                contents,
                user.id,
                product.id,
                review.id,
            ),
        )
    }

    useEffect(() => {
        getProduct()

        return () => {
            dispatch(setFocusedProduct(null))
            dispatch(setFocusedReview(null))
        }
    }, [])

    useEffect(() => {
        if (postStatus) {
            getProduct()
            setOpen(false)
            setRating(0)
            setResult(0)
            setJoined_at('')
            setContents('')
            setIsNew(false)
        }
    }, [postStatus])

    return (
        <>
            {product && (
                <>
                    <ProductDetailTemp
                        product={product}
                        setOpen={setOpen}
                        setIsNew={setIsNew}
                        edit={edit}
                    />
                    <ReviewForm
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
                </>
            )}
            {!product && <div>loading</div>}
        </>
    )
}
