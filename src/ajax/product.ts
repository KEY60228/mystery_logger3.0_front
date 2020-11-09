import axios from 'axios'
import { Product } from '../@types'
import { setApiStatus } from '../stores/error'
import { setFocusedProduct, setWannaStatus } from '../stores/product'

// Ajaxリクエストであることを示すヘッダーを付与する
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Cookieの送信を許可する
axios.defaults.withCredentials = true

// デフォルトURLの設定
axios.defaults.baseURL = 'https://localhost:1443'

// エラーレスポンスが返って来た場合、レスポンスオブジェクトを返す
axios.interceptors.response.use(
    response => response,
    error => error.response || error,
)

export const asyncGetProducts = (
    setProducts: (value: Product[] | null) => void,
) => {
    return async (dispatch: any) => {
        dispatch(setApiStatus(null))

        const response = await axios.get('https://localhost:1443/v1/products')

        if (response.status === 200) {
            setProducts(response.data)
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setApiStatus(false))
        }
    }
}

export const asyncGetProduct = (id: string) => {
    return async (dispatch: any) => {
        dispatch(setApiStatus(null))

        const response = await axios.get(`/v1/products/${id}`)

        if (response.status === 200) {
            dispatch(setFocusedProduct(response.data))
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setApiStatus(false))
        }
    }
}

export const asyncWanna = (user_id: number, product_id: number) => {
    return async(dispatch: any) => {
        dispatch(setApiStatus(null))
        dispatch(setWannaStatus(null))

        const response = await axios.put(
            '/v1/wanna',
            {
                user_id: user_id,
                product_id: product_id,
            }
        )

        if (response.status === 200) {
            dispatch(setWannaStatus(true))
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setWannaStatus(false))
            dispatch(setApiStatus(false))
        }
    }
}

export const asyncUnwanna = (user_id: number, product_id: number) => {
    return async(dispatch: any) => {
        dispatch(setApiStatus(null))
        dispatch(setWannaStatus(null))

        const response = await axios.delete(
            '/v1/wanna',
            { params: {
                user_id: user_id,
                product_id: product_id,
            }}
        )

        if (response.status === 204) {
            dispatch(setWannaStatus(true))
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setWannaStatus(false))
            dispatch(setApiStatus(false))
        }
    }
}
