import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// from:
//https://rapidapi.com/Coinranking/api/coinranking1/

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '9271cb1bffmsh3bfde2fc26f9dd1p125f3cjsn6324533a44df'
}
//https://coinranking1.p.rapidapi.com/coin/1/history/7d
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const balance = 0;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders, balance});


export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: ( builder ) => ({
    getCryptos: builder.query({
      //stats
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      //price
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history/${timeperiod}`),
    }),
    getCryptoExchanges: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetCryptoExchangesQuery } = cryptoApi;
