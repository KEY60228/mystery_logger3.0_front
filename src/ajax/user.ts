import axios from 'axios'

import { AppDispatch } from '../stores/index'
import { UserDetail } from '../@types'

// Ajaxリクエストであることを示すヘッダーを付与する
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Cookieの送信を許可する
axios.defaults.withCredentials = true

// デフォルトURLの設定
axios.defaults.baseURL = process.env.API_BASEURL

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

export const asyncGetUser = (
    account_id: string,
    setUser: (value: UserDetail) => void,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        const response = await axios.get(`/v1/users/${account_id}`)

        if (response.status === 200) {
            setUser(response.data)
        }

        if (response.status === 422) {
            // エラーハンドリング
        }
    }
}

export const asyncFollow = (followed_id: number) => {
    return async (dispatch: AppDispatch): Promise<void|ErrorResponse> => {
        const response = await axios.put('/v1/follow', {
            followed_id: followed_id,
        })

        if (response.status === 200) {
            return Promise.resolve()
        }

        if (response.status === 422) {
            return Promise.reject(response.data)
        }
    }
}

export const asyncUnFollow = (followed_id: number) => {
    return async (dispatch: AppDispatch): Promise<void|ErrorResponse> => {
        const response = await axios.delete('/v1/follow', {
            params: {
                followed_id: followed_id,
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

export const asyncUpdateUser = (
    formData: FormData,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        // PHPの仕様でputがFormDataを受け取れないらしいので偽装処理
        const response = await axios.post(`/v1/users`, formData, {
            headers: {
                'X-HTTP-Method-Override': 'PUT'
            }
        })

        if (response.status === 200) {
            return Promise.resolve()
        }

        if (response.status === 422) {
            return Promise.reject(response.data)
        }
    }
}
