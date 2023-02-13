// this is where we will create our methods to interact with the api
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500'}),
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
        })
    })
})

export const {
    useGetTodosQuery
} = apiSlice