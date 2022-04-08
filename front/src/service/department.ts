import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Department } from './../models/Department';
import { Account } from './../models/Account';


export const departmentAPI = createApi({
    reducerPath: 'departmentAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    tagTypes:['Department','Employee','Account'],
    endpoints: (build) => ({
        add: build.mutation<Department,{number: string, city: string, typeAccount:string}>({
            query: (department) => ({
                url: '/department/add',
                method: 'POST',
                body: department
            }),
            invalidatesTags: ['Department']
        }),
        get: build.query<Department[],null>({
            query:() => ({
                url:'/department/get'
            }),
            providesTags: ['Department','Employee']
        }),
        getById: build.query<Department,string>({
            query: (id)=> ({
                url: `/department/get/${id}`
            }),
            providesTags: ['Department']
        }),
        getByEmployee: build.query<Department,string>({
            query: (id)=> ({
                url: `/department/employee/${id}`
            }),
            providesTags: ['Department']
        }),
        deleteById: build.mutation<Department,string>({
            query: (id) => ({
                url: `/department/delete/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Department','Employee']
        }),
        getAccountByEmployee: build.query<Account,string>({
            query: (id) => ({
                url: `/department/account-employee/${id}`
            }),
            providesTags: ['Account']
        })
    })
})