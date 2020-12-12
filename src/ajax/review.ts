import axios from 'axios'

import { AppDispatch } from '../stores/index'
import { ReviewIndex, ReviewDetail } from '../@types'

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

// エラーレスポンスの型
interface ErrorResponse {
    errors?: []
    message: string
}

export const asyncGetTimeline = (
    setReviews: (value: ReviewIndex[] | null) => void,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        const response = await axios.get<ReviewIndex[]>('/v1/reviews')

        if (response.status === 200) {
            setReviews(response.data)
        }

        if (response.status === 422) {
            // エラーハンドリング
        }
    }
}

export const asyncGetReview = (
    id: string,
    setReview: (value: ReviewDetail | null) => void,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        const response = await axios.get<ReviewDetail>(`/v1/reviews/${id}`)

        if (response.status === 200) {
            setReview(response.data)
        }

        if (response.status === 422) {
            // エラーハンドリング
        }
    }
}

export const asyncPostReview = (
    product_id: number,
    spoil: boolean,
    rating: number,
    result: number,
    joined_at: string | null,
    contents: string | null,
) => {
    return async (dispatch: AppDispatch): Promise<void|ErrorResponse> => {
        const response = await axios.post<void>('/v1/reviews', {
            product_id: product_id,
            spoil: spoil,
            rating: rating,
            result: result,
            joined_at: joined_at,
            contents: contents,
        })

        if (response.status === 201) {
            return Promise.resolve()
        }

        if (response.status === 422) {
            return Promise.reject(response.data)
        }
    }
}

export const asyncUpdateReview = (
    review_id: number,
    spoil: boolean,
    rating: number,
    result: number,
    joined_at: string | null,
    contents: string | null,
) => {
    return async (dispatch: AppDispatch): Promise<void|ErrorResponse> => {
        const response = await axios.put<void>(`/v1/reviews/${review_id}`, {
            spoil: spoil,
            rating: rating,
            result: result,
            joined_at: joined_at,
            contents: contents,
        })

        if (response.status === 200) {
            return Promise.resolve()
        }

        if (response.status === 422) {
            return Promise.reject()
        }
    }
}

export const asyncDeleteReview = (review_id: number) => {
    return async (dispatch: AppDispatch): Promise<void|ErrorResponse> => {
        const response = await axios.delete<void>(`/v1/reviews/${review_id}`)

        if (response.status === 204) {
            return Promise.resolve()
        }

        if (response.status === 422) {
            return Promise.reject()
        }
    }
}

export const asyncPostComment = (
    review_id: number,
    contents: string,
) => {
    return async (dispatch: AppDispatch): Promise<void|ErrorResponse> => {
        const response = await axios.post<void|ErrorResponse>('/v1/comments/review', {
            review_id: review_id,
            contents: contents,
        })

        if (response.status === 201) {
            return Promise.resolve()
        }

        if (response.status === 422) {
            return Promise.reject(response.data)
        }
    }
}

export const asyncLikeReview = (review_id: number) => {
    return async (dispatch: AppDispatch): Promise<void|ErrorResponse> => {
        const response = await axios.put<void>('/v1/likes/review', {
            review_id: review_id,
        })

        if (response.status === 201) {
            return Promise.resolve()
        }

        if (response.status === 422) {
            return Promise.reject(response.data)
        }
    }
}

export const asyncUnlikeReview = (review_id: number) => {
    return async (dispatch: AppDispatch): Promise<void|ErrorResponse> => {
        const response = await axios.delete<void>('/v1/likes/review', {
            params: {
                review_id: review_id,
            },
        })

        if (response.status === 204) {
            return Promise.resolve()
        }

        if (response.status === 422) {
            return Promise.reject(response.data)
        }
    }
}
