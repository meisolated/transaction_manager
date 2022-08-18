const cartReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_CART":
            return [...state, { ...action.payload, id: state.length + 1 }]
        case "REMOVE_CART":
            return state.filter((cart) => cart.id !== action.payload.id)
        case "UPDATE_CART":
            return state.map((item) => (item.id === action.payload.cartItemID ? { ...item, quantity: item.quantity + action.payload.quantity } : item))
        case "CLEAR_CART":
            return []
        default:
            return state
    }
}

export default cartReducer
