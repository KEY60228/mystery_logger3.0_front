import axios from 'axios'
import { setApiStatus } from '../stores/error'
import { setFocusedProduct } from '../stores/product'

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

export const asyncGetProduct = (id: string) => {
    return async(dispatch: any) => {
        dispatch(setApiStatus(null))

        const response = await axios.get(
            `/v1/products/${id}`
        )

        if (response.status === 200) {
            dispatch(setFocusedProduct(response.data))
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setApiStatus(false))
        }
    }
}
