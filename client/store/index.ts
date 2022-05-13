import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import searchReducer from './slices/search';
import viewReducer from './slices/viewMode';
import orderReducer from './slices/orderController';

const rootReducer = combineReducers({
    authReducer,
    searchReducer,
    viewReducer,
    orderReducer,
});

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>

export default store;