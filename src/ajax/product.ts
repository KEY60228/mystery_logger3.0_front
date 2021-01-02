import axios from 'axios'

import { AppDispatch } from '../stores/index'
import { setCode } from '../stores/error'
import { ProductDetail, ProductIndex } from '../@types'
import {
    NOT_FOUND,
    NO_CONTENT,
    OK,
    UNAUTHENTICATED,
    UNPROCESSABLE_ENTITY,
} from '../util'

// Ajaxリクエストであることを示すヘッダーを付与する
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// プリフライト飛ばすためのヘッダー
axios.defaults.headers.common['X-NAZOLOG-TOKEN'] = process.env.X_NAZOLOG_TOKEN

// Cookieの送信を許可する
axios.defaults.withCredentials = true

// デフォルトURLの設定
axios.defaults.baseURL = process.env.API_BASEURL

// エラーレスポンスが返って来た場合、レスポンスオブジェクトを返す
axios.interceptors.response.use(
    response => response,
    error => error.response || error,
)

export const asyncGetProducts = () => {
    return async (dispatch: AppDispatch): Promise<ProductIndex[]> => {
        dispatch(setCode(null))

        const response = await axios.get<ProductIndex[]>('/v1/products')

        if (response.status === OK) {
            dispatch(setCode(OK))
            return Promise.resolve(response.data)
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}

export const asyncGetProduct = (id: string) => {
    return async (dispatch: AppDispatch): Promise<ProductDetail> => {
        dispatch(setCode(null))

        const response = await axios.get<ProductDetail>(`/v1/products/${id}`)

        if (response.status === OK) {
            return Promise.resolve(response.data)
        }

        if (response.status === NOT_FOUND) {
            dispatch(setCode(NOT_FOUND))
            return Promise.reject()
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}

export const asyncWanna = (product_id: number) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))

        const response = await axios.put<void>('/v1/wanna', {
            product_id: product_id,
        })

        if (response.status === OK) {
            dispatch(setCode(OK))
            return Promise.resolve()
        }

        if (response.status === UNAUTHENTICATED) {
            dispatch(setCode(UNAUTHENTICATED))
            return Promise.reject(response.data)
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            return Promise.reject(response.data)
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}

export const asyncUnwanna = (product_id: number) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))

        const response = await axios.delete<void>('/v1/wanna', {
            params: {
                product_id: product_id,
            },
        })

        if (response.status === NO_CONTENT) {
            dispatch(setCode(NO_CONTENT))
            return Promise.resolve()
        }

        if (response.status === UNAUTHENTICATED) {
            dispatch(setCode(UNAUTHENTICATED))
            return Promise.reject(response.data)
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            return Promise.reject(response.data)
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}
