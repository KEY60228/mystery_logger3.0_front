import { createSlice } from '@reduxjs/toolkit'
import { User } from '../@types'

export interface AuthStore {
    user: User|null
    apiStatus: boolean|null
}

// Stateの初期状態
const initialState: AuthStore = {
    user: null,
    apiStatus: null,
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
        setApiStatus: (state, action) => {
            return Object.assign({}, state, { apiStatus: action.payload })
        },
    },
})

// Reducerをエクスポートする
export default slice.reducer

// Action Creatorsをエクスポートする
export const { setUser, setApiStatus } = slice.actions