import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "../reducers/cart.reducer.js"

const rootReducer = {
    cart: cartReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store