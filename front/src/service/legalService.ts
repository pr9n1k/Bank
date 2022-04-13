
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Legal } from '../models/Legal';

export const legalAPI = createApi({
    reducerPath: 'legalAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    tagTypes: ['Account','Legal'],
    endpoints: build => ({
        add: build.mutation<Legal,{
            idClient:string, 
            title:string,
            inn:string,
            typeAccount:string,
            communalType:string
        }>({
            query:(legal) => ({
                url: '/legal/add',
                method:'POST',
                body: legal
            }),
            invalidatesTags: ['Legal','Account']
        }),
        get: build.query<Legal[],void>({
            query:() => ({
                url:'/legal/get'
            }),
            providesTags: ['Legal']
        }),
        legalCommunalGet: build.query<Legal[],void>({
            query:() => ({
                url:'/legal/get'
            }),
            transformResponse(response: Legal[],_,__){
                const legal = response.filter(item => 
                    item.communalType === 'Вода' || 
                    item.communalType === 'Свет' ||
                    item.communalType === 'Газ'    
                )
                return legal;
            },
            providesTags: ['Legal']
        }),
        getById: build.query<Legal,string>({
            query: (id)=> ({
                url: `/legal/get/${id}`
            }),
            providesTags: ['Legal']
        }),
        getByIdClient: build.query<Legal[],string>({
            query: (id) => ({
                url: `/legal/get/client/${id}`
            }),
            providesTags: ['Legal']
        }),
        getCommunal: build.query<Legal[],void>({
            query: () => '/legal/communal',
            providesTags: ['Legal']
        })
    })
})