// this is where we will create our methods to interact with the api
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500'}),
    // assign a tag to the cache
    // and let it know which mutations invalidated the cache
    // then it will automatically refetch that data
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse: res => res.sort((a, b) => b.id - a.id),
            // getTodos is providing the tag 'Todos'
            providesTags: ['Todos']
        }),
        // builder.mutation: we'll change the data, not just reading(.builder.query)
        addTodo: builder.mutation({
            // todo is passed in: it needs a new todo
            query: (todo) => ({
                // specifying a url
                url: '/todos',
                // what method we're using
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                // specify the specific todo with the id that we're going to update
                url: `/todos/${todo.id}`,
                // method PATCH : typically when you're just updating part of the record
                // method PUT : when you're replacing the full record
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            // we just need the id : destructuring that from the todo
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        })
    })
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice