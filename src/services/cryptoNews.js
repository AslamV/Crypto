import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const cryptoNewsHeader =  {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '0c1c3f76f7msh88910f01385ef64p17f358jsn746d31c2c5a5'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) => ({
    url,
    headers:cryptoNewsHeader
})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory,count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })

})

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;