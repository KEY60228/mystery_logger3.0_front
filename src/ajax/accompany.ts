import axios from 'axios'
import { AccompanyIndex } from '../@types'
import { AppDispatch } from '../stores/index'

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
    setAccompanies: (value: AccompanyIndex[]) => void
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        const response = await axios.get<AccompanyIndex[]>(`/v1/accompanies`)

        if (response.status === 200) {
            setAccompanies(response.data)
        }

        if (response.status === 422) {
            // エラーハンドリング
        }
    }
}

