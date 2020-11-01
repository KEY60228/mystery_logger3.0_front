import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Theme, createStyles  } from '@material-ui/core/styles'
import { Card, CardActionArea, CardMedia,  } from '@material-ui/core'

import { Product } from '../../@types'
import { ProductCounters } from '../molecules/ProductCounters'

interface Props {
  product: Product
  className?: ClassProps
}

interface ClassProps {
  rootWidth?: string
  mediaHeight?: string
  whiteSpace?: 'normal'
  display?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (className: ClassProps) => ({
      display: className.display,
      whiteSpace: className.whiteSpace,
      minWidth: className.rootWidth || '100px',
      margin: '4px', 
    }),
    media: (className: ClassProps) => ({
      backgroundSize: 'contain',
      height: className.mediaHeight || '150px',
    })
  })
)

export const ProductCard: FC<Props> = ({
  product, className
}) => {
  const classes = useStyles(className)

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/products/${product.id}`}>
        <CardMedia
          className={classes.media}
          image={`/product_img/${product.image_name}`}
        />
        <ProductCounters product={product} />
      </CardActionArea>
    </Card>
  )
}
