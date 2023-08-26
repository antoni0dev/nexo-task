import { configureStore } from '@reduxjs/toolkit';
import { binanceApi } from './features/cryptoPairs/binanceApiSlice';
import { bitfinexApi } from './features/cryptoPairs/bitfinexApiSlice';
import { krakenApi } from './features/cryptoPairs/krakenApiSlice';
import { huobiApi } from './features/cryptoPairs/huobiApiSlice';
import modalSlice from './features/modalSlice';

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    [binanceApi.reducerPath]: binanceApi.reducer,
    [bitfinexApi.reducerPath]: bitfinexApi.reducer,
    [krakenApi.reducerPath]: krakenApi.reducer,
    [huobiApi.reducerPath]: huobiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(binanceApi.middleware)
      .concat(bitfinexApi.middleware)
      .concat(krakenApi.middleware)
      .concat(huobiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
