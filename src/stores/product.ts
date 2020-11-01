import { createSlice } from '@reduxjs/toolkit'
import { ProductDetail } from '../@types'

export interface ProductStore {
    focusedProduct: ProductDetail|null
}

// Stateの初期状態
const initialState: ProductStore = {
    focusedProduct: null,
}

// Sliceを生成する
const slice = createSlice({
    name: 'product', // Sliceの名称
    initialState, // Stateの初期状態 (上で定義)
    reducers: {
        // action.payloadに渡された引数が入っている
        setFocusedProduct: (state, action) => {
            return Object.assign({}, state, { focusedProduct: action.payload })
        },
    },
})

// Reducerをエクスポートする
export default slice.reducer

// Action Creatorsをエクスポートする
export const { setFocusedProduct } = slice.actions