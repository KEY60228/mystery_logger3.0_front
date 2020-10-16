import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Box, Grid, Typography } from '@material-ui/core'

import { Product } from '../@types'
import { Ratings } from '../atoms/Ratings'
import { DoneButton } from '../atoms/DoneButton'
import { WannaButton } from '../atoms/WannaButton'
import { ProductProfile } from '../molecules/ProductProfile'

interface Props {
  product: Product
  className?: ClassProps
}

interface ClassProps {
  width?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '8px',
    },
    box: {
      marginTop: '12px',
      marginLeft: '12px',
    },
    media: {
      height: "240px",
      backgroundSize: 'contain',
      margin: "6px",
    },
  })
)

export const ProductContents: FC<Props> = ({
  product, className
}) => {
  const classes = useStyles(className)
  // 仮
  const post = (value: boolean) => console.log(value)
  const [wanna, setWanna] = useState<boolean>(false)

  return (
    <Card className={classes.root}>
      <Box className={classes.box}>
        <Typography variant='h6'>{ product.name }</Typography>
        <Typography variant='subtitle1'>{ product.contents }</Typography>
      </Box>
      <Grid container direction="row" wrap='nowrap'>
        <Grid>
          <img
            className={classes.media}
            src={`/product_img/${product.image_name}`}
            alt={product.name}
          />
          <Ratings number={product.avgRating || 0} size='medium' className={{marginLeft: '4px'}} />
          <Grid container direction="row" justify="center" alignItems="center" >
            <DoneButton number={product.reviews_count} onClick={() => post(true)} className={{margin: '8px'}} />
            <WannaButton number={800} wanna={wanna} onClick={setWanna} className={{margin: '8px'}} />
          </Grid>
        </Grid>
        <ProductProfile product={product} />
      </Grid>
    </Card>
  )
}
