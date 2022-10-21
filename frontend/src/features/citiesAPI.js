import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import apiurl from "../api";
export const citiesAPI = createApi({
    reducerPath: 'citiesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiurl}`
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getAllCities: builder.query({
            query: (city) => `/cities?city=${city}`
        }),
        getCity: builder.query({
            query: (id) => `/cities/${id}`
        }),
        postCity: builder.mutation({
            query: (body) => ({
                url: '/cities',
                method: 'POST',
                body: body,
                headers:{
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Post'],
        }),
        editCity:builder.mutation({
            query: (body) => ({
                url: `/cities/${body._id}`,
                method: 'PATCH',
                body: body,
                headers:{
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        }),
    })
})

export default citiesAPI
export const {useGetAllCitiesQuery, useGetCityQuery, usePostCityMutation, useEditCityMutation} = citiesAPI