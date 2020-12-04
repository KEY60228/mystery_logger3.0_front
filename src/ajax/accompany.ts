import axios from 'axios'
import { AccompanyDetail } from '../@types'

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

export const asyncGetAccompanies = (
    setAccompanies: (value: AccompanyDetail[]) => void
) => {
    return async (dispatch: any) => {
        const response = await axios.get(`/v1/accompanies`)

        if (response.status === 200) {
            setAccompanies(response.data)
        }

        if (response.status === 422) {
            // エラーハンドリング
        }
    }
}

