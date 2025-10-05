import { configureStore } from '@reduxjs/toolkit';
import isLoginSliceReducer from './slices/isloginSlice';

export const makeStore = ()=>{
    return configureStore({
        reducer : {
            isLoginSlice : isLoginSliceReducer
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
