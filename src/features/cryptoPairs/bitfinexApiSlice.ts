import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const baseUrl = 'https://api-pub.bitfinex.com/v2/';

export const bitfinexApi = createApi({
  reducerPath: 'bitfinexApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getPairData: builder.query({
      query: (pair: string) => `ticker/${pair}`,
    }),
    getHistoryTrades: builder.query({
      query: (pair: string) => `tickers/hist?symbols=${pair}&limit=2`,
    }),
  }),
});

export const { useGetPairDataQuery, useGetHistoryTradesQuery } = bitfinexApi;
