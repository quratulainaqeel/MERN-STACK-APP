export const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return { ...state, cart: [...state.cart, action.payload] }
        case "INCREASE_QUANTITY":
            return {
                ...state, cart: state.cart.map(item => {
                    if (item._id === action.payload._id) {
                        return {
                            ...item,
                            Quantity: item.Quantity + 1
                        }
                    }
                    return item
                })
            }

        case "DECREASE_QUANTITY":
            return {
                ...state, cart: state.cart.map(item => {
                    if (item._id === action.payload._id) {
                        return {
                            ...item,
                            Quantity: item.Quantity - 1
                        }
                    }
                    return item
                })
            }

        case "CLEAR_CART":
            return { ...state, cart: [] }

        case "DELETE_ITEM":
            console.log("Deleting item:", action.payload);
            return {
                ...state, cart: state.cart.filter((item) => item._id !== action.payload)
            };
        default:
            return state
    }
}