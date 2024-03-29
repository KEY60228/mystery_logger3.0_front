import axios from 'axios'
import queryString from 'query-string'

import { CurrentUser } from '../@types'
import { AppDispatch } from '../stores/index'
import { setUser } from '../stores/auth'
import { setCode, setLoading, setMessage, setPopper } from '../stores/error'
import { CREATED, NO_CONTENT, OK, UNPROCESSABLE_ENTITY } from '../util'

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

// 仮登録処理
export const asyncPreRegister = (email: string) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))
        dispatch(setLoading(true))

        const response = await axios.post<void>('/v1/preregister', {
            email: email,
        })

        if (response.status === CREATED) {
            dispatch(setCode(CREATED))
            dispatch(setLoading(false))
            return Promise.resolve()
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            dispatch(setLoading(false))
            dispatch(setMessage(response.data))
            return Promise.reject()
        }

        dispatch(setLoading(false))
        dispatch(setCode(response.status))
        return Promise.reject(response.status)
    }
}

// メールアドレス認証処理
export const asyncVerify = (
    query: queryString.ParsedQuery<string>,
) => {
    return async (dispatch: AppDispatch): Promise<{email: string, pre_register_id: number}> => {
        dispatch(setCode(null))

        const response = await axios.post<{
            email: string
            pre_register_id: number
        }>('/v1/register/verify', {
            token: query.token,
        })

        if (response.status === OK) {
            dispatch(setCode(OK))
            return Promise.resolve(response.data)
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            return Promise.reject()
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
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
    return async (dispatch: AppDispatch): Promise<CurrentUser> => {
        dispatch(setCode(null))
        dispatch(setPopper(null))
        dispatch(setLoading(true))

        const response = await axios.post<CurrentUser>('/v1/register', {
            account_id: accountId,
            email: email,
            name: name,
            password: password,
            password_confirmation: password,
            pre_register_id: preRegisterId,
        })

        if (response.status === CREATED) {
            dispatch(setUser(response.data))
            dispatch(setPopper('login'))
            dispatch(setLoading(false))
            dispatch(setCode(CREATED))
            return Promise.resolve(response.data)
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            dispatch(setLoading(false))
            dispatch(setMessage(response.data))
            return Promise.reject()
        }

        dispatch(setLoading(false))
        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}

// ログイン処理
export const asyncLogin = (email: string, password: string) => {
    return async (dispatch: AppDispatch): Promise<CurrentUser> => {
        dispatch(setCode(null))
        dispatch(setPopper(null))
        dispatch(setLoading(true))

        const response = await axios.post<CurrentUser>('/v1/login', {
            email: email,
            password: password,
        })

        if (response.status === OK) {
            dispatch(setUser(response.data))
            dispatch(setPopper('login'))
            dispatch(setCode(OK))
            dispatch(setLoading(false))
            return Promise.resolve(response.data)
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            dispatch(setMessage(response.data))
            dispatch(setLoading(false))
            return Promise.reject()
        }

        dispatch(setCode(response.status))
        dispatch(setLoading(false))
        return Promise.reject(response.data)
    }
}

// クッキーログイン & ユーザー情報更新
export const asyncGetCurrentUser = () => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))

        const response = await axios.get<CurrentUser>('/v1/currentuser')

        if (response.status === OK) {
            dispatch(setUser(response.data))
            dispatch(setCode(OK))
            return Promise.resolve()
        }

        if (response.status === NO_CONTENT) {
            dispatch(setCode(NO_CONTENT))
            return Promise.resolve()
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}

// ログアウト
export const asyncLogout = () => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))
        dispatch(setPopper(null))
        dispatch(setLoading(true))

        const response = await axios.post<void>('/v1/logout')

        if (response.status === OK) {
            dispatch(setUser(null))
            dispatch(setPopper('logout'))
            dispatch(setCode(OK))
            dispatch(setLoading(false))
            return Promise.resolve()
        }

        dispatch(setLoading(false))
        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}
