import axios from 'axios'

import { AppDispatch } from '../stores/index'
import { UserDetail } from '../@types'
import {
    NOT_FOUND,
    NO_CONTENT,
    OK,
    UNAUTHENTICATED,
    UNPROCESSABLE_ENTITY,
} from '../util'
import { setCode, setLoading, setMessage, setPopper } from '../stores/error'

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

export const asyncGetUser = (
    account_id: string,
) => {
    return async (dispatch: AppDispatch): Promise<UserDetail> => {
        dispatch(setCode(null))

        const response = await axios.get<UserDetail>(`/v1/users/${account_id}`)

        if (response.status === OK) {
            dispatch(setCode(OK))
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

export const asyncFollow = (followed_id: number) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))

        const response = await axios.put('/v1/follow', {
            followed_id: followed_id,
        })

        if (response.status === OK) {
            dispatch(setCode(OK))
            return Promise.resolve()
        }

        if (response.status === UNAUTHENTICATED) {
            dispatch(setCode(UNAUTHENTICATED))
            return Promise.reject()
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            return Promise.reject()
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}

export const asyncUnFollow = (followed_id: number) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        const response = await axios.delete('/v1/follow', {
            params: {
                followed_id: followed_id,
            },
        })

        if (response.status === NO_CONTENT) {
            dispatch(setCode(NO_CONTENT))
            return Promise.resolve()
        }

        if (response.status === UNAUTHENTICATED) {
            dispatch(setCode(UNAUTHENTICATED))
            return Promise.reject()
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            return Promise.reject()
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}

export const asyncUpdateUser = (formData: FormData) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))
        dispatch(setMessage(null))
        dispatch(setPopper(null))
        dispatch(setLoading(true))

        // PHPの仕様でputがFormDataを受け取れないらしいので偽装処理
        const response = await axios.post(`/v1/users`, formData, {
            headers: {
                'X-HTTP-Method-Override': 'PUT',
            },
        })

        if (response.status === OK) {
            dispatch(setLoading(false))
            dispatch(setPopper('posted user'))
            dispatch(setCode(OK))
            return Promise.resolve()
        }

        if (response.status === UNAUTHENTICATED) {
            dispatch(setLoading(false))
            dispatch(setCode(UNAUTHENTICATED))
            return Promise.reject()
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setLoading(false))
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            dispatch(setMessage(response.data))
            return Promise.reject()
        }

        dispatch(setLoading(false))
        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}
