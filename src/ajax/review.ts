import axios from 'axios'

import { AppDispatch } from '../stores/index'
import { ReviewIndex, ReviewDetail } from '../@types'
import { setCode, setPopper } from '../stores/error'
import { CREATED, NOT_FOUND, NO_CONTENT, OK, UNAUTHENTICATED, UNPROCESSABLE_ENTITY } from '../util'

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

export const asyncGetTimeline = (
    setReviews: (value: ReviewIndex[] | null) => void,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))
    
        const response = await axios.get<ReviewIndex[]>('/v1/reviews')

        if (response.status === OK) {
            setReviews(response.data)
            dispatch(setCode(OK))
            return Promise.resolve()
        }

        if (response.status === UNAUTHENTICATED) {
            dispatch(setCode(UNAUTHENTICATED))
            return Promise.reject()
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}

export const asyncGetReview = (
    id: string,
    setReview: (value: ReviewDetail | null) => void,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))

        const response = await axios.get<ReviewDetail>(`/v1/reviews/${id}`)

        if (response.status === OK) {
            setReview(response.data)
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

export const asyncPostReview = (
    product_id: number,
    spoil: boolean,
    rating: number,
    result: number,
    joined_at: string | null,
    contents: string | null,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))
        dispatch(setPopper(null))
        
        const response = await axios.post<void>('/v1/reviews', {
            product_id: product_id,
            spoil: spoil,
            rating: rating,
            result: result,
            joined_at: joined_at,
            contents: contents,
        })

        if (response.status === CREATED) {
            dispatch(setCode(CREATED))
            dispatch(setPopper('posted review'))
            return Promise.resolve()
        }

        if (response.status === NOT_FOUND) {
            dispatch(setCode(NOT_FOUND))
            return Promise.reject(response.data)
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            return Promise.reject(response.data)
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
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
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))
        dispatch(setPopper(null))

        const response = await axios.put<void>(`/v1/reviews/${review_id}`, {
            spoil: spoil,
            rating: rating,
            result: result,
            joined_at: joined_at,
            contents: contents,
        })

        if (response.status === OK) {
            dispatch(setPopper('posted review'))
            dispatch(setCode(OK))
            return Promise.resolve()
        }

        if (response.status === UNAUTHENTICATED) {
            dispatch(setCode(UNAUTHENTICATED))
            return Promise.reject(response.data)
        }

        if (response.status === NOT_FOUND) {
            dispatch(setCode(NOT_FOUND))
            return Promise.reject(response.data)
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            return Promise.reject(response.data)
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}

export const asyncDeleteReview = (review_id: number) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))
        dispatch(setPopper(null))

        const response = await axios.delete<void>(`/v1/reviews/${review_id}`)

        if (response.status === NO_CONTENT) {
            dispatch(setPopper('deleted review'))
            dispatch(setCode(NO_CONTENT))
            return Promise.resolve()
        }

        if (response.status === UNAUTHENTICATED) {
            dispatch(setCode(UNAUTHENTICATED))
            return Promise.reject(response.data)
        }

        if (response.status === NOT_FOUND) {
            dispatch(setCode(NOT_FOUND))
            return Promise.reject(response.data)
        }
        
        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            return Promise.reject(response.data)
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}

export const asyncPostComment = (
    review_id: number,
    contents: string,
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))
        dispatch(setPopper(null))

        const response = await axios.post<void>('/v1/comments/review', {
            review_id: review_id,
            contents: contents,
        })

        if (response.status === CREATED) {
            dispatch(setPopper('commented'))
            dispatch(setCode(CREATED))
            return Promise.resolve()
        }

        if (response.status === UNAUTHENTICATED) {
            dispatch(setCode(UNAUTHENTICATED))
            return Promise.reject(response.data)
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            return Promise.reject(response.data)
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}

export const asyncLikeReview = (review_id: number) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))

        const response = await axios.put<void>('/v1/likes/review', {
            review_id: review_id,
        })

        if (response.status === CREATED) {
            dispatch(setCode(CREATED))
            return Promise.resolve()
        }

        if (response.status === UNAUTHENTICATED) {
            dispatch(setCode(UNAUTHENTICATED))
            return Promise.reject(response.data)
        }
        
        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            return Promise.reject(response.data)
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}

export const asyncUnlikeReview = (review_id: number) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))

        const response = await axios.delete<void>('/v1/likes/review', {
            params: {
                review_id: review_id,
            },
        })

        if (response.status === NO_CONTENT) {
            dispatch(setCode(NO_CONTENT))
            return Promise.resolve()
        }

        if (response.status === UNAUTHENTICATED) {
            dispatch(setCode(UNAUTHENTICATED))
            return Promise.reject(response.data)
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            return Promise.reject(response.data)
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}

export const asyncGetSpoiledContents = (
    review_id: number,
    setReview: (value: ReviewDetail) => void
) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setCode(null))

        const response = await axios.get(`/v1/spoil/${review_id}`)

        if (response.status === OK) {
            setReview(response.data)
            dispatch(setCode(OK))
            return Promise.resolve()
        }

        if (response.status === UNAUTHENTICATED) {
            dispatch(setCode(UNAUTHENTICATED))
            return Promise.reject(response.data)
        }

        if (response.status === NOT_FOUND) {
            dispatch(setCode(NOT_FOUND))
            return Promise.reject(response.data)
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            dispatch(setCode(UNPROCESSABLE_ENTITY))
            return Promise.reject(response.data)
        }

        dispatch(setCode(response.status))
        return Promise.reject(response.data)
    }
}
