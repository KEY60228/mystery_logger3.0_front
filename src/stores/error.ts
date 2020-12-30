import { createSlice } from '@reduxjs/toolkit'

export interface ErrorStore {
    code: number | null
    message: ErrorResponse | null
    popper: string | null
    loading: boolean
}

interface ErrorResponse {
    errors?: {
        email?: string[]
        account_id?: string[]
        name?: string[]
        password?: string[]
        comment?: string[]
    }
    message: string
}

// Stateの初期状態
const initialState: ErrorStore = {
    code: null,
    message: null,
    popper: null,
    loading: false,
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
        setMessage: (state, action) => {
            return Object.assign({}, state, { message: action.payload })
        },
        setPopper: (state, action) => {
            return Object.assign({}, state, { popper: action.payload })
        },
        setLoading: (state, action) => {
            return Object.assign({}, state, { loading: action.payload })
        },
    },
})

// Reducerをエクスポートする
export default slice.reducer

// Action Creatorsをエクスポートする
export const { setCode, setMessage, setPopper, setLoading } = slice.actions
