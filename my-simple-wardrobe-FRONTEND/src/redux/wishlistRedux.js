import { createSlice } from "@reduxjs/toolkit"

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlistId: null,
        wishlist: [],
    },
    reducers: {
        createWishlist: (state, action) => {
            state.wishlistId = action.payload._id
            state.wishlist = []
        },
        setWishlist: (state, action) => {
            state.wishlistId = action.payload._id
            state.wishlist = action.payload.wishlist
        },
        editWishlistItem: (state, action) => {
            state.wishlist = action.payload.wishlist
        },
    }
})


export const { createWishlist, setWishlist, editWishlistItem } = wishlistSlice.actions
export default wishlistSlice.reducer