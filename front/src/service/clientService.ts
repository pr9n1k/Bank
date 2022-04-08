import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Client } from '../models/Client';

export const clientAPI = createApi({
    reducerPath: 'clientAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    tagTypes: ['Client'],
    endpoints:(build) => ({
        add: build.mutation<Client,Client>({
            query:(client) => ({
                url:'/client/add',
                method:'POST',
                body:client
            }),
            invalidatesTags:['Client']
        }),
        get: build.query<{client: Client[],number: number},{limit: number, page:number}>({
            query:(args = {limit:1, page: 1}) => ({
                url:`/client/get?limit=${args.limit}&page=${args.page - 1}`,
            }),
            transformResponse(response: Client[],meta){
                return{
                    client: response,
                    number: Number(meta?.response?.headers.get('X-Total-Count'))
                }
            },
            providesTags: ['Client']
        }),
        getById: build.query<Client,string>({
            query: (id)=> ({
                url: `/client/get/${id}`
            }),
            providesTags: ['Client']
        }),
    })
})