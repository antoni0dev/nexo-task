import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://binance43.p.rapidapi.com';

export const binanceApi = createApi({
  reducerPath: 'binanceApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', import.meta.env.RAPID_API_KEY);
      headers.set('X-RapidAPI-Host', 'binance43.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTickerData: builder.query({
      query: (symbol: string) => `ticker/24hr?symbol=${symbol}`,
    }),
  }),
});

export const { useGetTickerDataQuery } = binanceApi;
export default binanceApi.reducer;
