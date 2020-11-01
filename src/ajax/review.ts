import axios from 'axios'
import { ReviewDetail } from '../@types'
import { setApiStatus } from '../stores/error'
import { setFocusedReview } from '../stores/review'
import { asyncGetProduct } from './product'

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

export const asyncGetTimeline = (
    user_id: number|undefined, // 仮！！！
    setReviews: (value: ReviewDetail[]|null) => void
) => {
    return async(dispatch: any) => {
        dispatch(setApiStatus(null))

        const response = await axios.get(
            'https://localhost:1443/v1/reviews',
            {
                params: {
                    'user_id': user_id // 仮
                }
            }
        )

        if (response.status === 200) {
            setReviews(response.data)
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setApiStatus(false))
        }
    }
}

export const asyncGetReview = (id: string) => {
    return async(dispatch: any) => {
        dispatch(setApiStatus(null))

        const response = await axios.get(
            `/v1/reviews/${id}`
        )

        if (response.status === 200) {
            dispatch(setFocusedReview(response.data))
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setApiStatus(false))
        }
    }
}

export const asyncPostReview = (
    rating: number,
    result: number,
    joined_at: string|null,
    contents: string|null,
    user_id: number|undefined, // 仮！！
    product_id: number|undefined // 仮！！
) => {
    return async(dispatch: any) => {
        dispatch(setApiStatus(null))

        const response = await axios.post(
            '/v1/reviews',
            {
                'rating': rating,
                'result': result,
                'joined_at': joined_at,
                'contents': contents,
                'user_id': user_id,
                'product_id': product_id,
                'clear_time': null // 仮
            }
        )

        if (response.status === 201) {
            if (product_id) dispatch(asyncGetProduct(product_id.toString())) // 仮！！
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setApiStatus(false))
        }
    }
}

export const asyncUpdateReview = (
    rating: number,
    result: number,
    joined_at: string|null,
    contents: string|null,
    user_id: number|undefined, // 仮！！
    product_id: number|undefined, // 仮！！
    review_id: number|undefined // 仮！！
) => {
    return async(dispatch: any) => {
        dispatch(setApiStatus(null))

        const response = await axios.put(
            `/v1/reviews/${review_id}`,
            {
                'rating': rating,
                'result': result,
                'joined_at': joined_at,
                'contents': contents,
                'user_id': user_id,
                'product_id': product_id,
                'clear_time': null // 仮
            }
        )

        if (response.status === 200) {
            if (product_id) dispatch(asyncGetProduct(product_id.toString())) // 仮！！
            dispatch(setApiStatus(true))
        }

        if (response.status === 422) {
            dispatch(setApiStatus(false))
        }
    }
}
