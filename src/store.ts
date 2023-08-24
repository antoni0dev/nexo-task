import { configureStore } from '@reduxjs/toolkit';
import { binanceApi } from './features/cryptoPairs/binanceApiSlice';

export const store = configureStore({
  reducer: {
    [binanceApi.reducerPath]: binanceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(binanceApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
