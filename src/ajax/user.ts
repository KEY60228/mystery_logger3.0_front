import axios from 'axios'

import { AppDispatch } from '../stores/index'
import { setUpdateUserStatus } from '../stores/user'
import { UserDetail } from '../@types'

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

export const asyncFollow = (following_id: number, followed_id: number) => {
    return async (dispatch: AppDispatch): Promise<void|ErrorResponse> => {
        const response = await axios.put('/v1/follow', {
            following_id: following_id,
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

export const asyncUnFollow = (following_id: number, followed_id: number) => {
    return async (dispatch: AppDispatch): Promise<void|ErrorResponse> => {
        const response = await axios.delete('/v1/unfollow', {
            params: {
                following_id: following_id,
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
    id: number,
    name: string,
    account_id: string,
    profile: string,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setUpdateUserStatus(null))

        const response = await axios.put(`/v1/users/${id}`, {
            name: name,
            account_id: account_id,
            profile: profile,
        })

        if (response.status === 200) {
            dispatch(setUpdateUserStatus(true))
        }

        if (response.status === 422) {
            dispatch(setUpdateUserStatus(false))
        }
    }
}
