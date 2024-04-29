import React, {useState,useContext} from "react"
import CartContext from "./CartContext"

const CartContextProvider = ({children})=>{
    const [cart,setCart] = useState([])
    return (
        <CartContext.Provider value={{cart,setCart}}>
            {children}
        </CartContext.Provider>
    )
}

 export const useCart = ()=> useContext(CartContext)

export default CartContextProvider;