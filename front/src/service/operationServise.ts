import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Communal } from "../models/Communal";
import { Encashment } from "../models/Encashment";
import { Operation } from "../models/Operation";


export const operationAPI = createApi({
    reducerPath: 'operationAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    tagTypes: ['Operation','Account','Communal','Encashment'],
    endpoints: build => ({
        add: build.mutation<Operation,Operation>({
            query: (operation) => ({
                url: `operation/add`,
                method:'POST',
                body: operation
            }),
            invalidatesTags:['Operation']
        }),
        getNotConfirm: build.query<{
            operation:Operation[],
            number:number
        },{
            limit: number, 
            page:number,
            idEmployee:string
        }>({
            query: (args = {limit:1, page: 1, idEmployee:''}) => ({
                url: `/operation/not-confirm?limit=${args.limit}&page=${args.page - 1}&id=${args.idEmployee}`
            }),
            transformResponse(response: Operation[],meta){
                return{
                    operation: response,
                    number: Number(meta?.response?.headers.get('X-Total-Count'))
                }
            },
            providesTags: ['Operation']
        }),
        Confirm: build.mutation<string,string>({
            query: (number) => ({
                url: `operation/confirm/${number}`,
                method:'POST'
            }),
            invalidatesTags:['Operation','Account']
        }),
        addCommunal: build.mutation<Communal,Communal>({
            query: (communal) => ({
                url: '/operation/communal',
                method: 'POST',
                body: communal
            }),
            invalidatesTags:['Communal','Account']
        }),
        addEncashment: build.mutation<Encashment,Encashment>({
            query: (encashment) => ({
                url: 'operation/encashment',
                method: 'POST',
                body: encashment
            }),
            invalidatesTags:['Encashment']
        }),
        getByIdEncashment: build.query<Encashment,string>({
            query: (id) => ({
                url: `operation/encashment/${id}`
            }),
            providesTags:['Encashment']
        }),
        getAdmin: build.query<Encashment[],void>({
            query: _ => ({
                url: 'operation/encashment-admin'
            }),
            providesTags:['Encashment']
        }),
        getCashier: build.query<Encashment[],void>({
            query: _ => ({
                url: 'operation/encashment-cashier'
            }),
            providesTags:['Encashment']
        })
    })
})