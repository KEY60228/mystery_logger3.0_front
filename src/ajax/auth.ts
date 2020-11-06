import axios from 'axios'
import { setPreRegisterStatus, setUser } from '../stores/auth'
import { setApiStatus } from '../stores/error'
import queryString from 'query-string'

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
    return async (dispatch: any) => {
        dispatch(setApiStatus(null))
        dispatch(setPreRegisterStatus(null))
        
        const response = await axios.post(
            'https://localhost:1443/v1/preregister',
            { email: email },
        )
            
        if (response.status === 201) {
            dispatch(setPreRegisterStatus(true))
            dispatch(setApiStatus(true))
        }
        
        if (response.status === 422) {
            dispatch(setPreRegisterStatus(false))
            dispatch(setApiStatus(false))
        }
    }
}

// メールアドレス認証処理
export const asyncVerify = (
    query: queryString.ParsedQuery<string>,
    setPreRegisterId: (value: number) => void,
    setEmail: (value: string) => void,
) => {
    return async (dispatch: any) => {
        dispatch(setApiStatus(null))

        const response = await axios.post('/v1/register/verify', {
            token: query.token,
        })

        if (response.status === 200) {
            setPreRegisterId(response.data.pre_register_id)
            setEmail(response.data.email)
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setApiStatus(false))
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
    return async (dispatch: any) => {
        dispatch(setApiStatus(null))

        const response = await axios.post('/v1/register', {
            account_id: accountId,
            email: email,
            name: name,
            password: password,
            password_confirmation: password,
            pre_register_id: preRegisterId,
        })

        if (response.status === 201) {
            dispatch(setUser(response.data))
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setApiStatus(false))
        }
    }
}

// ログイン処理
export const asyncLogin = (email: string, password: string) => {
    return async (dispatch: any) => {
        dispatch(setApiStatus(null))

        const response = await axios.post('/v1/login', {
            email: email,
            password: password,
        })

        if (response.status === 200) {
            dispatch(setUser(response.data))
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setApiStatus(false))
        }
    }
}

// クッキーログイン & ユーザー情報更新
export const asyncGetCurrentUser = () => {
    return async(dispatch: any) => {
        dispatch(setApiStatus(null))

        const response = await axios.get(
            '/v1/currentuser'
        )

        if (response.status === 200) {
            dispatch(setUser(response.data))
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setApiStatus(false))
        }
    }  
}
