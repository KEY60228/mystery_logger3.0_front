import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { asyncGetProduct } from '../ajax/product'
import { asyncPostReview, asyncUpdateReview } from '../ajax/review'
import { RootState } from '../stores/index'
import { ProductDetail as ProductDetailTemp } from '../templates/ProductDetail'
import { ReviewForm } from '../organisms/ReviewForm'

export const ProductDetail: FC = () => {
    const dispatch = useDispatch()

    interface Params {
        id: string
    }
    const { id } = useParams<Params>()

    const apiStatus = useSelector((state: RootState) => state.error.apiStatus)
    const postStatus = useSelector((state: RootState) => state.review.postStatus)
    const product = useSelector((state: RootState) => state.product.focusedProduct)
    const review = useSelector((state: RootState) => state.review.focusedReview)
    const user = useSelector((state: RootState) => state.auth.user)

    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string|null>('')
    const [contents, setContents] = useState<string|null>('')

    // 投稿フォームの開閉
    const [open, setOpen] = useState<boolean>(false)
    // 新規投稿 or 編集
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const getProduct = () => {
        dispatch(asyncGetProduct(id))
    }

    const post = () => {
        dispatch(asyncPostReview(rating, result, joined_at, contents, user?.id, product?.id))
    }

    const edit = () => {
        dispatch(asyncUpdateReview(rating, result, joined_at, contents, user?.id, product?.id, review?.id))
    }

    useEffect(() => {
        getProduct()
    }, [])

    useEffect(() => {
        if (postStatus) {
            getProduct()
            setOpen(false)
            setRating(0)
            setResult(0)
            setJoined_at('')
            setContents('')
            setIsEdit(false)
        }
    }, [postStatus])

    return (
        <>
            { product &&
                <>
                    <ProductDetailTemp
                        product={product}
                        setOpen={setOpen}
                        setRating={setRating}
                        setResult={setResult}
                        setJoined_at={setJoined_at}
                        setContents={setContents}
                        setIsEdit={setIsEdit}
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
                        edit={edit}
                        isEdit={isEdit}
                        product={product}
                    />
                </>
            }
            { !product &&
                <div>loading</div>
            }
        </>
    )
}