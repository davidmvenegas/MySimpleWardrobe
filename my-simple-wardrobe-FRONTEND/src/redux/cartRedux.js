import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            if (state.products.some(item => ((item._id + item.color + item.size) === (action.payload._id + action.payload.color + action.payload.size)))) {
                state.products.find(item => item._id === action.payload._id).quantity += action.payload.quantity
                state.total += action.payload.price * action.payload.quantity
            } else {
                state.quantity += 1
                state.products.push(action.payload)
                state.total += action.payload.price * action.payload.quantity
            }
        },
        removeAllProduct: (state, action) => {
            state.products = state.products.filter(item => ((item._id + item.color + item.size) !== (action.payload.product._id + action.payload.product.color + action.payload.product.size)))
            state.total -= action.payload.price * action.payload.quantity
            state.quantity -= 1
        },
        removeProduct: (state, action) => {
            state.products.find(item => ((item._id + item.color + item.size) === (action.payload.product._id + action.payload.product.color + action.payload.product.size))).quantity -= 1
            state.total -= action.payload.product.price
        },
        addCartProduct: (state, action) => {
            state.products.find(item => ((item._id + item.color + item.size) === (action.payload.product._id + action.payload.product.color + action.payload.product.size))).quantity += 1
            state.total += action.payload.product.price
        },
        emptyCart: (state) => {
            state.products = []
            state.quantity = 0
            state.total = 0
        },
        removeFromShopping: (state, action) => {
            state.products = state.products.filter(e => ((e._id + e.color + e.size) !== (action.payload.item._id + action.payload.item.color.at(0).toString() + action.payload.item.size.at(0).toString())))
            state.total -= action.payload.price * action.payload.quantity
            state.quantity -= 1
        }
    }
})


export const { addProduct, removeAllProduct, removeProduct, addCartProduct, emptyCart, removeFromShopping } = cartSlice.actions
export default cartSlice.reducer