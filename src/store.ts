import { configureStore } from '@reduxjs/toolkit';
import { binanceApi } from './features/cryptoPairs/binanceApiSlice';
import { bitfinexApi } from './features/cryptoPairs/bitfinexApiSlice';
import { krakenApi } from './features/cryptoPairs/krakenApiSlice';
import { huobiApi } from './features/cryptoPairs/huobiApiSlice';

export const store = configureStore({
  reducer: {
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

export default store;
