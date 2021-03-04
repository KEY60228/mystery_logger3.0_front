import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { Product } from '../@types'

interface Props {
    product: Product
    transition?: boolean
    className: ClassProps
}

interface ClassProps {
    width: string
    height: string
    margin?: string
}

const useStyles = makeStyles(theme =>
    createStyles({
        root: (className: ClassProps) => ({
            height: className.height,
            width: className.width,
            margin: className.margin || '0',
            backgroundColor: theme.palette.common.black,
            objectFit: 'contain',
            borderRadius: '10px',
            verticalAlign: 'top',
        }),
    })
)

export const ProductImage: FC<Props> = props => {
    const classes = useStyles(props.className)
    const history = useHistory()

    const transition = () => {
        if (props.transition || props.transition === undefined) {
            history.push(`/products/${props.product.id}`)
        }
    }

    return (
        <img
            src={`${process.env.API_BASEURL}${props.product.image_name}`}
            onClick={transition}
            className={classes.root}
        />
    )
}