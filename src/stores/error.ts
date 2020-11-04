import { createSlice } from '@reduxjs/toolkit'

export interface ErrorStore {
    apiStatus: boolean | null
}

// Stateの初期状態
const initialState: ErrorStore = {
    apiStatus: null,
}

// Sliceを生成する
const slice = createSlice({
    name: 'error', // Sliceの名称
    initialState, // Stateの初期状態 (上で定義)
    reducers: {
        // action.payloadに渡された引数が入っている
        setApiStatus: (state, action) => {
            return Object.assign({}, state, { apiStatus: action.payload })
        },
    },
})

// Reducerをエクスポートする
export default slice.reducer

// Action Creatorsをエクスポートする
export const { setApiStatus } = slice.actions
