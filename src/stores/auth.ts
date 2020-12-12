import { createSlice } from '@reduxjs/toolkit'
import { CurrentUser } from '../@types'

export interface AuthStore {
    user: CurrentUser | null
    registerStatus: boolean | null
}

// Stateの初期状態
const initialState: AuthStore = {
    user: null,
    registerStatus: null,
}

// Sliceを生成する
const slice = createSlice({
    name: 'auth', // Sliceの名称
    initialState, // Stateの初期状態 (上で定義)
    reducers: {
        // action.payloadに渡された引数が入っている
        setUser: (state, action) => {
            return Object.assign({}, state, { user: action.payload })
        },
        setRegisterStatus: (state, action) => {
            return Object.assign({}, state, { registerStatus: action.payload })
        },
    },
})

// Reducerをエクスポートする
export default slice.reducer

// Action Creatorsをエクスポートする
export const {
    setUser,
    setRegisterStatus,
} = slice.actions
