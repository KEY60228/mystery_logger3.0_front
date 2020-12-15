import axios from 'axios'

import { AppDispatch } from '../stores/index'
import { VenueDetail } from '../@types'

// Ajaxリクエストであることを示すヘッダーを付与する
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Cookieの送信を許可する
axios.defaults.withCredentials = true

// デフォルトURLの設定
axios.defaults.baseURL = process.env.API_BASEURL

// エラーレスポンスが返って来た場合、レスポンスオブジェクトを返す
axios.interceptors.response.use(
    response => response,
    error => error.response || error,
)

export const asyncGetVenue = (
    venue_id: string,
    setVenue: (value: VenueDetail) => void
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        const response = await axios.get(`/v1/venues/${venue_id}`)

        if (response.status === 200) {
            setVenue(response.data)
        }

        if (response.status === 422) {
            // エラーハンドリング
        }
    }
}

