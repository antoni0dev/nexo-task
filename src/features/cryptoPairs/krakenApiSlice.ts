import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const baseUrl = 'https://api.kraken.com/';

export const krakenApi = createApi({
  reducerPath: 'krakenApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getPairData: builder.query({
      query: (pair: string) => `0/public/Ticker?pair=${pair}"`,
    }),
    getHistoryTrades: builder.query({
      query: (pair: string) => `/public/Trades?pair=${pair}`,
    }),
  }),
});

export const { useGetPairDataQuery, useGetHistoryTradesQuery } = krakenApi;
