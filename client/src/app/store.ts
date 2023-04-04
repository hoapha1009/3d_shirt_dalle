import appReducer from '../components/appSlice'
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  app: appReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
