import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

// slice.reducerをimport
import authReducer from './auth'
import errorReducer from './error'
// import productReducer from './product'
import reviewReducer from './review'
// import userReducer from './user'
// import messageReducer from './message'

// 各reducerを統合
const reducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    // product: productReducer,
    review: reviewReducer,
    // user: userReducer,
    // message: messageReducer,
})

const store = configureStore({ reducer })

export default store

// 型定義
export type RootState = ReturnType<typeof reducer>

// Dispatchの型定義とカスタムuseDispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = (): AppDispatch => useDispatch()

