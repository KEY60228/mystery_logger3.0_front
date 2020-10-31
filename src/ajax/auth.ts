import axios from 'axios'
import { setUser, setApiStatus } from '../stores/auth'

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

export const asyncLogin = (email: string, password: string) => {
    return async(dispatch: any) => {
        dispatch(setApiStatus(null))
        
        const response = await axios.post(
            '/v1/login',
            { 'email': email, 'password': password }
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
