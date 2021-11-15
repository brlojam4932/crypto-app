import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// from:
//https://rapidapi.com/Coinranking/api/coinranking1/

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '9271cb1bffmsh3bfde2fc26f9dd1p125f3cjsn6324533a44df'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com/';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: ( builder ) => ({
    getCryptos: builder.query( {
      query: () => createRequest(`/coins?limit=${100}`)
    })
  })
});

export const {
  useGetCryptosQuery,
} = cryptoApi;
