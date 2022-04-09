
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Account } from '../models/Account';

export const accountAPI = createApi({
    reducerPath:'accountAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    tagTypes: ['Account'],
    endpoints:(build) => ({
        add: build.mutation<Account,{id:String,value: [{currency:string, money: string}], typeAccount: string}>({
            query:({id,value,typeAccount}) => ({
                url:`client/create-account`,
                method:'POST',
                body:{value,typeAccount,idObject:id}
            }),
            invalidatesTags:['Account']
        }),
        get: build.query<Account[],string>({
            query:(id)=>({
                url:`/client/get/${id}/account`
            }),
            providesTags: ['Account']
        }),
        getAll: build.query<Account[],void>({
            query:()=>({
                url:'/client/get-account'
            }),
            providesTags: ['Account']
        }),
        getByNumber: build.query<Account,{number:String}>({
            query:({number})=>({
                url:`/client/get/account/${number}`
            }),
            providesTags: ['Account']
        }),
        getByEmployee: build.query<Account,string>({
            query: (id) => ({
                url:`client/get/account-employee/${id}`
            }),
            providesTags:['Account']
        }),
    })
})