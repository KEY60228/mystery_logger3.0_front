import { createSlice } from '@reduxjs/toolkit'
import { ReviewDetail } from '../@types'

export interface ReviewStore {
    focusedReview: ReviewDetail | null
    postStatus: boolean | null
}

// Stateの初期状態
const initialState: ReviewStore = {
    focusedReview: null,
    postStatus: null,
}

// Sliceを生成する
const slice = createSlice({
    name: 'review', // Sliceの名称
    initialState, // Stateの初期状態 (上で定義)
    reducers: {
        // action.payloadに渡された引数が入っている
        setFocusedReview: (state, action) => {
            return Object.assign({}, state, { focusedReview: action.payload })
        },
        setPostStatus: (state, action) => {
            return Object.assign({}, state, { postStatus: action.payload })
        },
    },
})

// Reducerをエクスポートする
export default slice.reducer

// Action Creatorsをエクスポートする
export const { setFocusedReview, setPostStatus } = slice.actions