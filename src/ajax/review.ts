import axios from 'axios'

import { AppDispatch } from '../stores/index'
import {
    setPostStatus,
    setCommentStatus,
    setLikeStatus,
} from '../stores/review'
import { ReviewDetail } from '../@types'

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
    return async (dispatch: AppDispatch): Promise<void> => {
        const response = await axios.get<ReviewDetail[]>('/v1/reviews', {
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
    rating: number,
    result: number,
    joined_at: string | null,
    contents: string | null,
    user_id: number,
    product_id: number,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setPostStatus(null))

        const response = await axios.post<void>('/v1/reviews', {
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
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setPostStatus(null))

        const response = await axios.put<void>(`/v1/reviews/${review_id}`, {
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

export const asyncDeleteReview = (review_id: number) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setPostStatus(null))

        const response = await axios.delete<void>(`/v1/reviews/${review_id}`)

        if (response.status === 204) {
            dispatch(setPostStatus(true))
        }

        if (response.status === 422) {
            dispatch(setPostStatus(false))
        }
    }
}

export const asyncPostComment = (
    user_id: number,
    review_id: number,
    contents: string,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCommentStatus(null))

        const response = await axios.post<void>('/v1/reviews/comments', {
            user_id: user_id,
            review_id: review_id,
            contents: contents,
        })

        if (response.status === 201) {
            dispatch(setCommentStatus(true))
        }

        if (response.status === 422) {
            dispatch(setCommentStatus(false))
        }
    }
}

export const asyncLikeReview = (user_id: number, review_id: number) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setLikeStatus(null))

        const response = await axios.put<void>('/v1/likes/reviews', {
            user_id: user_id,
            review_id: review_id,
        })

        if (response.status === 201) {
            dispatch(setLikeStatus(true))
        }

        if (response.status === 422) {
            dispatch(setLikeStatus(false))
        }
    }
}

export const asyncUnlikeReview = (user_id: number, review_id: number) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setLikeStatus(null))

        const response = await axios.delete<void>('/v1/likes/reviews', {
            params: {
                user_id: user_id,
                review_id: review_id,
            },
        })

        if (response.status === 204) {
            dispatch(setLikeStatus(true))
        }

        if (response.status === 422) {
            dispatch(setLikeStatus(false))
        }
    }
}
