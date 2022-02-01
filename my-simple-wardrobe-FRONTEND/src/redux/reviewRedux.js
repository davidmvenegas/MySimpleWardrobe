import { createSlice } from "@reduxjs/toolkit"

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
    },
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload
        },
        editReviewsItem: (state, action) => {
            state.reviews = action.payload
        },
    }
})


export const { setReviews, editReviewsItem } = reviewsSlice.actions
export default reviewsSlice.reducer