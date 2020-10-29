import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

import { RootState } from '../stores/index'
import { ProductDetail as ProductDetailInterface } from '../@types'
import { ProductDetail as ProductDetailTemp } from '../templates/ProductDetail'
import { ReviewForm } from '../organisms/ReviewForm'

export const ProductDetail: FC = () => {
  interface Params {
    id: string
  }
  const { id } = useParams<Params>()

  const [open, setOpen] = useState<boolean>(false)

  const [product, setProduct] = useState<ProductDetailInterface|null>(null)
  const getProduct = async() => {
    const response = await axios.get(`https://localhost:1443/v1/products/${id}`)

    if (response.status === 422) {
      console.log(response)
    }

    if (response.status === 200) {
      setProduct(response.data)
    }
  }

  const [rating, setRating] = useState<number>(0)
  const [result, setResult] = useState<number>(0)
  const [joined_at, setJoined_at] = useState<string|null>('')
  const [contents, setContents] = useState<string|null>('')
  const user = useSelector((state: RootState) => state.auth.user)
  const post = async() => {
    const data = {
      rating: rating,
      result: result,
      joined_at: joined_at,
      contents: contents,
      user_id: user?.id, // 仮
      product_id: product?.id, // 仮
      clear_time: null,
    }

    await axios.post(
      'https://localhost:1443/v1/reviews',
      data
    ).then((response) => {
      if (response.status === 201) {
        console.log(response.data)
      }
      setOpen(false)
      getProduct()
      setRating(0)
      setResult(0)
      setJoined_at('')
      setContents('')
    }).catch((error) =>
      console.log(error)
    )
  }

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [reviewId, setReviewId] = useState<number>(0)
  const edit = async() => {
    const data = {
      rating: rating,
      result: result,
      joined_at: joined_at,
      contents: contents,
      user_id: user?.id, // 仮
      product_id: product?.id, // 仮
      clear_time: null,
    }

    await axios.put(
      `https://localhost:1443/v1/reviews/${reviewId}`,
      data
    ).then((response) => {
      if (response.status === 201) {
        console.log(response.data)
      }
      setOpen(false)
      getProduct()
      setRating(0)
      setResult(0)
      setJoined_at('')
      setContents('')
      setIsEdit(false)
    }).catch((error) =>
      console.log(error)
    )
  }

  useEffect(() => {
    getProduct()
  }, [])

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
            setReviewId={setReviewId}
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