import axios from 'axios'
import {
    setPreRegisterStatus,
    setRegisterStatus,
    setUser,
} from '../stores/auth'
import queryString from 'query-string'

import { AppDispatch } from '../stores/index'
import { CurrentUser } from '../@types'

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

// 仮登録処理
export const asyncPreRegister = (email: string) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setPreRegisterStatus(null))

        const response = await axios.post<void>(
            'https://localhost:1443/v1/preregister',
            { email: email },
        )

        if (response.status === 201) {
            dispatch(setPreRegisterStatus(true))
        }

        if (response.status === 422) {
            dispatch(setPreRegisterStatus(false))
        }
    }
}

// メールアドレス認証処理
export const asyncVerify = (
    query: queryString.ParsedQuery<string>,
    setPreRegisterId: (value: number) => void,
    setEmail: (value: string) => void,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setRegisterStatus(null))

        const response = await axios.post<{email: string, pre_register_id: number}>('/v1/register/verify', {
            token: query.token,
        })

        if (response.status === 200) {
            setPreRegisterId(response.data.pre_register_id)
            setEmail(response.data.email)
            dispatch(setRegisterStatus(true))
        }

        if (response.status === 422) {
            dispatch(setRegisterStatus(false))
        }
    }
}

// 本登録処理
export const asyncRegister = (
    accountId: string,
    email: string,
    name: string,
    password: string,
    preRegisterId: number,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        const response = await axios.post<CurrentUser>('/v1/register', {
            account_id: accountId,
            email: email,
            name: name,
            password: password,
            password_confirmation: password,
            pre_register_id: preRegisterId,
        })

        if (response.status === 201) {
            dispatch(setUser(response.data))
        }

        if (response.status === 422) {
            // エラー処理
        }
    }
}

// ログイン処理
export const asyncLogin = (email: string, password: string) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        const response = await axios.post<CurrentUser>('/v1/login', {
            email: email,
            password: password,
        })

        if (response.status === 200) {
            dispatch(setUser(response.data))
        }

        if (response.status === 422) {
            // エラー処理
        }
    }
}

// クッキーログイン & ユーザー情報更新
export const asyncGetCurrentUser = () => {
    return async (dispatch: AppDispatch): Promise<void> => {
        const response = await axios.get<CurrentUser>('/v1/currentuser')

        if (response.status === 200) {
            dispatch(setUser(response.data))
        }

        if (response.status === 422) {
            // エラー処理
        }
    }
}
