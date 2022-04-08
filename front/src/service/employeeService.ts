import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { Employee } from '../models/Employee';


export const employeeAPI = createApi({
    reducerPath:'employeeAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    tagTypes: ['Employee'],
    endpoints:(build) => ({
        get: build.query<{employee:Employee[],number: number},{limit: number, page:number}>({
            query: (args = {limit:1, page: 1})=> ({
                url: `/employee/get?limit=${args.limit}&page=${args.page - 1}`
            }),
            transformResponse(response: Employee[],meta){
                return{
                    employee: response,
                    number: Number(meta?.response?.headers.get('X-Total-Count'))
                }
            },
            providesTags: ['Employee']
        }),
        getById: build.query<Employee,string>({
            query: (id)=> ({
                url: `/employee/get/${id}`
            }),
            providesTags: ['Employee']
        }),
        create: build.mutation<Employee,Employee>({
            query:(employee) => ({
                url: '/employee/add',
                method: 'POST',
                body: employee
            }),
            invalidatesTags:['Employee']
        }),
        getByDepartment: build.query<Employee[],string>({
            query: (id) => ({
                url: `/employee/get/department/${id}`
            }),
            providesTags: ['Employee']
        }),
        update: build.mutation<Employee,Employee>({
            query: (employee) => ({
                url: `/employee/update`,
                method:'PUT',
                body:employee
            }),
            invalidatesTags:['Employee']
        }),
        deleteById: build.mutation<Employee,string>({
            query: (_id) => ({
                url: `/employee/delete`,
                method:'DELETE',
                body:{id:_id}
            }),
            invalidatesTags:['Employee']
        })
    })
})