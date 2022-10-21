import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import apiurl from "../api";
export const itinerariesAPI =  createApi({
    reducerPath: 'itinerariesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiurl}`
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        allItineraries: builder.mutation({
            query: (id) => ({
                url: `/itineraries?city=${id}`,
                method: 'GET'
            })
        }),
        allItinerariesUser: builder.mutation({
            query: (id) => ({
                url: `/itineraries?user=${id}`,
                method: 'GET'
            })
        }),
        getItinerary: builder.mutation({
            query: (id) => ({
                url: `/itineraries/${id}`,
                method: 'GET'
            })
        }),
        editItinerary: builder.mutation({
            query: (body) => ({
                url: `/itineraries/${body.id}`,
                method: 'PATCH',
                body: body,
                headers:{
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        }),
        likeDislike: builder.mutation({
            query: (id) => ({
                url: `/itineraries/likes/${id}`,
                method: 'PATCH',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        }),
        deleteItinerary: builder.mutation({
            query: (id) => ({
                url: `/itineraries/${id}`,
                method: 'DELETE',
                headers:{
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        }),
        createItinerary: builder.mutation({
            query: (body) => ({
                url: '/itineraries',
                method: 'POST',
                body: body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Post'],
        }),
    }),


})
export default itinerariesAPI
export const {useAllItinerariesMutation, useAllItinerariesUserMutation, useGetItineraryMutation, useEditItineraryMutation, useDeleteItineraryMutation, useCreateItineraryMutation, useLikeDislikeMutation} = itinerariesAPI