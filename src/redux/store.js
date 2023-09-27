import { configureStore } from '@reduxjs/toolkit';
import users from '@/redux/features/users';

export const store = configureStore({
    reducer:{users},
    devTools: process.env.NODE_ENV !== "production",
  })


export const RootState = store.getState;
export const AppDispatch = store.dispatch;