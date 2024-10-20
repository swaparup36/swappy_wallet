import { configureStore } from '@reduxjs/toolkit';
import addressReducer from './features/wallets/addressSlice';

export const store = configureStore({
  reducer: {
    address: addressReducer
  }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;