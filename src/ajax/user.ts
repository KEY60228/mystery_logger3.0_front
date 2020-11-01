import axios from 'axios'
import { setApiStatus } from '../stores/error'
import { UserDetail } from '../@types'

// Ajaxリクエストであることを示すヘッダーを付与する
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// // Cookieの送信を許可する
// axios.defaults.withCredentials = true

// デフォルトURLの設定
axios.defaults.baseURL = 'https://localhost:1443'

// エラーレスポンスが返って来た場合、レスポンスオブジェクトを返す
axios.interceptors.response.use(
    response => response,
    error => error.response || error
)

export const asyncGetUser = (account_id: string, setUser: (value: UserDetail) => void) => {
    return async(dispatch: any) => {
        dispatch(setApiStatus(null))

        const response = await axios.get(
            `/v1/users/${account_id}`
        )

        if (response.status === 200) {
            setUser(response.data)
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setApiStatus(false))
        }
    }
}

export const asyncFollow = (
    following_id: number|undefined, // 仮！！
    followed_id: number|undefined // 仮！！
) => {
    return async(dispatch: any) => {
        dispatch(setApiStatus(null))

        const response = await axios.put(
            '/v1/follow',
            {
                'following_id': following_id,
                'followed_id': followed_id
            }
        )

        if (response.status === 200) {
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setApiStatus(false))
        }
    }
}
