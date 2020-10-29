import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { ProductDetail as ProductDetailInterface } from '../@types'
import { ProductContents } from '../organisms/ProductContents'
import { ProductReviews } from '../organisms/ProductReviews'
import { TempSpace } from '../organisms/TempSpace'

interface Props {
  product: ProductDetailInterface
  setOpen: (value: boolean) => void
  setRating: (value: number) => void
  setResult: (value: number) => void
  setJoined_at: (value: string|null) => void
  setContents: (value: string|null) => void
  setIsEdit: (value: boolean) => void
  setReviewId: (value: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    }
  })
)

export const ProductDetail: FC<Props> = ({
  product, setOpen, setRating, setResult, setJoined_at, setContents, setIsEdit, setReviewId
}) => {
  const classes = useStyles()

  return (
    <>
      <ProductContents product={product} setModalOpen={setOpen} />
      <ProductReviews
        product={product}
        setOpen={setOpen}
        setRating={setRating}
        setResult={setResult}
        setJoined_at={setJoined_at}
        setContents={setContents}
        setIsEdit={setIsEdit}
        setReviewId={setReviewId}
      />
      <TempSpace text='Ad Space' className={{height: '320px', margin:'12px auto 60px'}} />
    </>
  )
}
