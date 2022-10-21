import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import apiurl from "../api";
export const activitiesAPI =  createApi({
    reducerPath: 'activitiesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiurl}`
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getActivities: builder.query({
            query: (id) => `/activities?itinerary=${id}`
        }),
        createActivity: builder.mutation({
            query: (body) => ({
                url: '/activities',
                method: 'POST',
                body: body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Post'],
        }),
    })
})
export default activitiesAPI
export const {useGetActivitiesQuery, useCreateActivityMutation} = activitiesAPI