import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import apiurl from "../api";
export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiurl}`
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (body) => ({
                url: '/auth/signup',
                method: 'POST',
                body: body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Post'],
        }),
        signIn: builder.mutation({
            query: (body) => ({
                url: '/auth/signin',
                method: 'POST',
                body: body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Post'],
        }),
        signInToken: builder.mutation({
            query: (token) => ({
                url: '/auth/token',
                method: 'GET',
                headers: {Authorization: `Bearer ${token}` }
            })
        }),
        signOut: builder.mutation({
            query: (body) => ({
                url: '/auth/signout',
                method: 'POST',
                body: body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Post'],
        }),
        editProfile: builder.mutation({
            query: (body) => ({
                url: '/auth/editProfile',
                method: 'PATCH',
                body: body,
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            }),
        }),
    })
})
export default usersAPI
export const { useSignUpMutation, useSignInMutation, useSignOutMutation, useSignInTokenMutation, useEditProfileMutation } = usersAPI
