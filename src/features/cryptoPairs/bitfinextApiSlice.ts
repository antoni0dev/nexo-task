import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const baseUrl = 'https://api-pub.bitfinex.com/';

export const bitfinexApi = createApi({
  reducerPath: 'bitfinexApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getPairData: builder.query({
      query: (pair) => `v2/ticker/${pair}`,
    }),
  }),
});

export const { useGetPairDataQuery } = bitfinexApi;
