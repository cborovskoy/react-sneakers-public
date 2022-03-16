import {AppContext} from "../App";
import React from "react";

export const useCart = () => {
    let {cartItems, setCartItems, getItemData} = React.useContext(AppContext)

    cartItems = cartItems.map((item) =>  getItemData(item.idItem))
    const totalPrice = cartItems.reduce((sum, obj) => sum + obj.item.price, 0)

    return {cartItems, setCartItems, totalPrice}
}