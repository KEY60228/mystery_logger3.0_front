import axios from 'axios'
import { ReviewDetail } from '../@types'
import { setFocusedReview, setPostStatus } from '../stores/review'

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

export const asyncGetTimeline = (
    user_id: number,
    setReviews: (value: ReviewDetail[] | null) => void,
) => {
    return async (dispatch: any) => {
        const response = await axios.get('/v1/reviews', {
            params: {
                user_id: user_id, // 仮
            },
        })

        if (response.status === 200) {
            setReviews(response.data)
        }

        if (response.status === 422) {
            // エラーハンドリング
        }
    }
}

export const asyncGetReview = (id: string) => {
    return async (dispatch: any) => {
        const response = await axios.get(`/v1/reviews/${id}`)

        if (response.status === 200) {
            dispatch(setFocusedReview(response.data))
        }

        if (response.status === 422) {
            // エラーハンドリング
        }
    }
}

export const asyncPostReview = (
    rating: number,
    result: number,
    joined_at: string | null,
    contents: string | null,
    user_id: number,
    product_id: number,
) => {
    return async (dispatch: any) => {
        dispatch(setPostStatus(null))

        const response = await axios.post('/v1/reviews', {
            rating: rating,
            result: result,
            joined_at: joined_at,
            contents: contents,
            user_id: user_id,
            product_id: product_id,
            clear_time: null, // 仮
        })

        if (response.status === 201) {
            dispatch(setPostStatus(true))
        }

        if (response.status === 422) {
            dispatch(setPostStatus(false))
        }
    }
}

export const asyncUpdateReview = (
    rating: number,
    result: number,
    joined_at: string | null,
    contents: string | null,
    user_id: number,
    product_id: number,
    review_id: number,
) => {
    return async (dispatch: any) => {
        dispatch(setPostStatus(null))

        const response = await axios.put(`/v1/reviews/${review_id}`, {
            rating: rating,
            result: result,
            joined_at: joined_at,
            contents: contents,
            user_id: user_id,
            product_id: product_id,
            clear_time: null, // 仮
        })

        if (response.status === 200) {
            dispatch(setPostStatus(true))
        }

        if (response.status === 422) {
            dispatch(setPostStatus(false))
        }
    }
}

export const asyncDeleteReview = (
    review_id: number
) => {
    return async(dispatch: any) => {
        dispatch(setPostStatus(null))
        
        const response = await axios.delete(
            `/v1/reviews/${review_id}`
        )

        if (response.status === 204) {
            dispatch(setPostStatus(true))
        }
        
        if (response.status === 422) {
            dispatch(setPostStatus(false))
        }
    }
}
