import { createSlice } from '@reduxjs/toolkit'

export interface ErrorStore {
    code: number | null
}

// Stateの初期状態
const initialState: ErrorStore = {
    code: null,
}

// Sliceを生成する
const slice = createSlice({
    name: 'error', // Sliceの名称
    initialState, // Stateの初期状態 (上で定義)
    reducers: {
        // action.payloadに渡された引数が入っている
        setCode: (state, action) => {
            return Object.assign({}, state, { code: action.payload })
        },
    },
})

// Reducerをエクスポートする
export default slice.reducer

// Action Creatorsをエクスポートする
export const { setCode } = slice.actions
