import { createSlice } from "@reduxjs/toolkit";

export const loggedSlice = createSlice({
    name: "logged",
    initialState: {
        loggedState: false,
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.loggedState= true
            },
        deleteUser: (state, action) => {
            state.user = null
            state.loggedState = false
            }
    }

})

export const { entry, setUser, deleteUser } = loggedSlice.actions

export default loggedSlice.reducer