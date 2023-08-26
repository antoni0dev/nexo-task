import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://api.binance.com/';

export const binanceApi = createApi({
  reducerPath: 'binanceApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getAllPairs: builder.query({
      query: () => 'api/v3/ticker/price',
    }),
    getPairData: builder.query({
      query: (pair: string) => `api/v3/ticker/price?symbol=${pair}`,
    }),
    getHistoryTrades: builder.query({
      query: (pair: string, limit = 10) =>
        `api/v3/trades?symbol=${pair}&limit=${limit}`,
    }),
  }),
});

export const {
  useGetAllPairsQuery,
  useGetPairDataQuery,
  useGetHistoryTradesQuery,
} = binanceApi;
