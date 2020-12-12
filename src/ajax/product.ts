import axios from 'axios'

import { AppDispatch } from '../stores/index'
import { setFocusedProduct } from '../stores/product'
import { ProductDetail } from '../@types'

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

// エラーレスポンスの型
interface ErrorResponse {
    errors?: []
    message: string
}

export const asyncGetProducts = (
    setProducts: (value: ProductDetail[] | null) => void,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        const response = await axios.get<ProductDetail[]>('/v1/products')

        if (response.status === 200) {
            setProducts(response.data)
        }

        if (response.status === 422) {
            // エラー処理
        }
    }
}

export const asyncGetProduct = (id: string) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        const response = await axios.get<ProductDetail>(`/v1/products/${id}`)

        if (response.status === 200) {
            dispatch(setFocusedProduct(response.data))
        }

        if (response.status === 422) {
            // エラーハンドリング
        }
    }
}

export const asyncWanna = (user_id: number, product_id: number) => {
    return async (dispatch: AppDispatch): Promise<void|ErrorResponse> => {
        const response = await axios.put<void>('/v1/wanna', {
            user_id: user_id,
            product_id: product_id,
        })

        if (response.status === 200) {
            return Promise.resolve()
        }

        if (response.status === 422) {
            return Promise.reject(response.data)
        }
    }
}

export const asyncUnwanna = (user_id: number, product_id: number) => {
    return async (dispatch: AppDispatch): Promise<void|ErrorResponse> => {
        const response = await axios.delete<void>('/v1/wanna', {
            params: {
                user_id: user_id,
                product_id: product_id,
            },
        })

        if (response.status === 204) {
            return Promise.resolve()
        }

        if (response.status === 422) {
            return Promise.reject(response.data)
        }
    }
}
