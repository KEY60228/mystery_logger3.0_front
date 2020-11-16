import { createSlice } from '@reduxjs/toolkit'

export interface UserStore {
    followStatus: boolean | null
    updateUserStatus: boolean | null
}

// Stateの初期状態
const initialState: UserStore = {
    followStatus: null,
    updateUserStatus: null,
}

// Sliceを生成する
const slice = createSlice({
    name: 'user', // Sliceの名称
    initialState, // Stateの初期状態 (上で定義)
    reducers: {
        // action.payloadに渡された引数が入っている
        setFollowStatus: (state, action) => {
            return Object.assign({}, state, { followStatus: action.payload })
        },
        setUpdateUserStatus: (state, action) => {
            return Object.assign({}, state, { updateUserStatus: action.payload })
        },
    },
})

// Reducerをエクスポートする
export default slice.reducer

// Action Creatorsをエクスポートする
export const { setFollowStatus, setUpdateUserStatus} = slice.actions
