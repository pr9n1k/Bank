import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { Employee } from './../models/Employee';
export const authAPI = createApi({
    reducerPath:'authAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    endpoints:(build) => ({
        login: build.mutation<Employee,{login: string,password: string}>({
            query: (logpass)=> ({
                url: '/auth/login',
                method: 'POST',
                body: logpass
            }),
            async onQueryStarted(_,{queryFulfilled,}){
                const data = (await queryFulfilled).data;
                localStorage.setItem('user',data.id as string);
            },
        }),
        get: build.query({
            query: () => ({
                url: 'https://www.cbr-xml-daily.ru/daily_json.js'
            })
        })
    })
    
})