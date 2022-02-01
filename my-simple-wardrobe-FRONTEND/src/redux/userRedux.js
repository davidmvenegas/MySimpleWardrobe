import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.error = false
            state.isFetching = false
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        logout: (state) => {
            state.currentUser = null
        },
        updateUser: (state, action) => {
            state.currentUser = action.payload
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = userSlice.actions
export default userSlice.reducer