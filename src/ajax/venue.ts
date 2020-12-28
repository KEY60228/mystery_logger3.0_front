import axios from 'axios'

import { AppDispatch } from '../stores/index'
import { VenueDetail } from '../@types'
import { setCode } from '../stores/error'
import { NOT_FOUND, OK } from '../util'

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

export const asyncGetVenue = (
    venue_id: string,
    setVenue: (value: VenueDetail) => void,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))

        const response = await axios.get(`/v1/venues/${venue_id}`)

        if (response.status === OK) {
            setVenue(response.data)
            dispatch(setCode(OK))
            return Promise.resolve()
        }

        if (response.status === NOT_FOUND) {
            dispatch(setCode(NOT_FOUND))
            return Promise.reject(response.data)
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}
