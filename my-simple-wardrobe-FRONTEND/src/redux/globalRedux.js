import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartRedux"
import userReducer from "./userRedux"
import modalReducer from "./modalRedux"
import wishlistReducer from "./wishlistRedux"
import reviewsReducer from "./reviewRedux"
import ordersReducer from "./orderRedux"


const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer, modal: modalReducer, wishlist: wishlistReducer, reviews: reviewsReducer, orders: ordersReducer })
const persistentReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistentReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}})
})

export let persistor = persistStore(store)