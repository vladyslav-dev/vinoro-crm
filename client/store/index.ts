import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth';

const rootReducer = combineReducers({
    authReducer
});

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>

export default store;