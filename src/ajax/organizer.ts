import axios from 'axios'
import { OrganizerDetail } from '../@types'

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

export const asyncGetOrganizer = (
    organizer_id: string,
    setOrganizer: (value: OrganizerDetail) => void
) => {
    return async (dispatch: any) => {
        const response = await axios.get(`/v1/organizer/${organizer_id}`)

        if (response.status === 200) {
            setOrganizer(response.data)
        }

        if (response.status === 422) {
            // エラーハンドリング
        }
    }
}

