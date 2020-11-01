import React, { FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Product } from '../@types'
import { TopPage as TPTemp} from '../templates/TopPage'
import { asyncGetProducts } from '../ajax/product'

export const TopPage: FC = () => {
    const dispatch = useDispatch()

    const [products, setProducts] = useState<Product[]|null>(null)

    const getProducts = () => {
        dispatch(asyncGetProducts(setProducts))
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            { products &&
                <TPTemp products={products} />
            }
            { !products &&
                <div>loading</div>
            }
        </>
    )
}