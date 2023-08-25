import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const baseUrl = 'ttps://api.huobi.pro/market/';

export const huobiApi = createApi({
  reducerPath: 'huobiApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getPairData: builder.query({
      query: (pair: string) => `market/detail/merged?symbol=${pair}`,
    }),
  }),
});

export const { useGetPairDataQuery } = huobiApi;
