import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const baseUrl = 'https://api.huobi.pro/';

export const huobiApi = createApi({
  reducerPath: 'huobiApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getPairData: builder.query({
      query: (pair: string) => `market/detail/merged?symbol=${pair}`,
    }),
    getHistoryTrades: builder.query({
      query: (pair: string) => `market/history/trade?symbol=${pair}&size=2`,
    }),
  }),
});

export const { useGetPairDataQuery, useGetHistoryTradesQuery } = huobiApi;
