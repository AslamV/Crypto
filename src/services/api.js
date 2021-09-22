// import { build } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle'
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const cryptoApiHeader =  {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '0c1c3f76f7msh88910f01385ef64p17f358jsn746d31c2c5a5'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({
    url,
    headers:cryptoApiHeader
})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDeatils: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({coinId , timeperoid}) => createRequest(`/coin/${coinId}/history/7d`),
        }),
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
        })
    })

})

export const {
    useGetCryptosQuery,useGetCryptoDeatilsQuery,useGetCryptoHistoryQuery,useGetExchangesQuery
} = cryptoApi;