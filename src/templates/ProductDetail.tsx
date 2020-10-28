import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { ProductDetail as ProductDetailInterface } from '../@types'
import { ProductContents } from '../organisms/ProductContents'
import { ProductReviews } from '../organisms/ProductReviews'
import { TempSpace } from '../organisms/TempSpace'

interface Props {
  product: ProductDetailInterface
  setOpen: (value: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    }
  })
)

export const ProductDetail: FC<Props> = ({
  product, setOpen
}) => {
  const classes = useStyles()

  return (
    <>
      <ProductContents product={product} setModalOpen={setOpen} />
      <ProductReviews product={product} />
      <TempSpace text='Ad Space' className={{height: '320px', margin:'12px auto 60px'}} />
    </>
  )
}
