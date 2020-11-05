import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { AuthStore } from './auth'
import { ErrorStore } from './error'
import { ProductStore } from './product'
import { ReviewStore } from './review'
import { UserStore } from './user'

// それぞれ slice.reducer を default export している前提
import authReducer from './auth'
import errorReducer from './error'
import productReducer from './product'
import reviewReducer from './review'
import userReducer from './user'
// import messageReducer from './message'

const reducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    product: productReducer,
    review: reviewReducer,
    user: userReducer,
    // message: messageReducer,
})

const store = configureStore({ reducer })

export default store

// 型定義
export interface RootState {
    auth: AuthStore
    error: ErrorStore
    product: ProductStore
    review: ReviewStore
    user: UserStore
}
