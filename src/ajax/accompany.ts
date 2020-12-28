import axios from 'axios'
import { AccompanyIndex } from '../@types'
import { AppDispatch } from '../stores/index'
import { setCode } from '../stores/error'
import { OK } from '../util'

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

export const asyncGetAccompanies = (
    setAccompanies: (value: AccompanyIndex[]) => void,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))

        const response = await axios.get<AccompanyIndex[]>(`/v1/accompanies`)

        if (response.status === OK) {
            setAccompanies(response.data)
            dispatch(setCode(OK))
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}
