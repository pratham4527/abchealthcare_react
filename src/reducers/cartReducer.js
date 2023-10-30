// reducers/cartReducer.js

const initialState = {
    cartData: null,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CART_DATA':
            return {
                ...state,
                cartData: action.payload,
            };
        default:
            return state;
    }
};

export default cartReducer;
