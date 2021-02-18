import {CLEAR_CART, DECREASE, GET_TOTAL, INCREASE, REMOVE} from "./actions";
import cartItems from "./cart-items";

const initialStore = {
    cart: cartItems,
    total: 120,
    amount: 5,
}

function reducer(state = initialStore, action){
    switch (action.type) {
        case INCREASE:
            let tempCart = state.cart.map((item)=> {
                if (item.id === action.payload.id){
                    item = {...item, amount: item.amount + 1}
                }
                return item
            })
            return {...state, cart: tempCart }
        case DECREASE:
            let tempsCart = []
            if(action.payload.amount === 1){
              tempsCart = state.cart.filter((item)=> item.id !== action.payload.id)
            }else {
                tempsCart = state.cart.map((item)=> {
                    if (item.id === action.payload.id){
                        item = {...item, amount: item.amount - 1}
                    }
                    return item
                })
            }

            return {...state, cart: tempsCart }
        case CLEAR_CART:
            return {...state, cart: []}
        case REMOVE:
            let tempValue = state.cart.filter((item)=> item.id !== action.payload.id)
            return {...state, cart: tempValue}
        case GET_TOTAL:
            let {total, amount} = state.cart.reduce((cartTotal, cartItem)=> {
                const {price, amount} = cartItem
                const itemTotal = price * amount
                cartTotal.total = itemTotal
                cartTotal.amount += amount
                return cartTotal
            }, {total: 0, amount: 0})
            total = parseFloat(total.toFixed(2))
            return {...state, total, amount}

        default:
            return state

    }
}
export default reducer