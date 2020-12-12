import { createSlice } from '@reduxjs/toolkit'
import { ReviewDetail } from '../@types'

export interface ReviewStore {
    focusedReview: ReviewDetail | null
}

// Stateの初期状態
const initialState: ReviewStore = {
    focusedReview: null,
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
    },
})

// Reducerをエクスポートする
export default slice.reducer

// Action Creatorsをエクスポートする
export const {
    setFocusedReview,
} = slice.actions
