import {AppContext} from "../App";
import React from "react";

export const useFav = () => {
    let {favorites, getItemData} = React.useContext(AppContext)
    favorites = favorites.map((item) => getItemData(item.idItem))

    return {favorites}
}