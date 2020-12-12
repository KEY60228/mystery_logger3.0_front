import { createSlice } from '@reduxjs/toolkit'

export interface UserStore {
    updateUserStatus: boolean | null
}

// Stateの初期状態
const initialState: UserStore = {
    updateUserStatus: null,
}

// Sliceを生成する
const slice = createSlice({
    name: 'user', // Sliceの名称
    initialState, // Stateの初期状態 (上で定義)
    reducers: {
        // action.payloadに渡された引数が入っている
        setUpdateUserStatus: (state, action) => {
            return Object.assign({}, state, {
                updateUserStatus: action.payload,
            })
        },
    },
})

// Reducerをエクスポートする
export default slice.reducer

// Action Creatorsをエクスポートする
export const { setUpdateUserStatus } = slice.actions
