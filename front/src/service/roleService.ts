import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Role } from './../models/Role';



export const roleAPI = createApi({
    reducerPath:'roleAPI',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    endpoints:(build) => ({
        getAll: build.query<Role[],null>({
            query: ()=> ({
                url: `/role/get`
            })
        }),
        add: build.mutation<Role,{title:string,value:string}>({
            query:(value)=>({
                url: '/role/add',
                method: 'POST',
                body: value
            })
        })
    })
})
