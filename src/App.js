import React, {useEffect} from "react";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import {urlAPI} from "./config"

export const AppContext = React.createContext({})

function App() {
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [favorites, setFavorites] = React.useState([])
    const [orders, setOrders] = React.useState([])

    const [showDrawer, setShowDrawer] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)


    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                const cartResponse = await axios.get(urlAPI + 'cart')
                const favoritesResponse = await axios.get(urlAPI + 'favorites')
                const itemsResponse = await axios.get(urlAPI + 'items')
                const ordersResponse = await axios.get(urlAPI + 'orders')

                setItems(itemsResponse.data)
                setCartItems(cartResponse.data)
                setFavorites(favoritesResponse.data)
                setOrders(ordersResponse.data)
                setIsLoading(false)
            } catch (e) {
                alert(e)
            }
        }

        fetchData()
    }, [])


    // Получение всей информации об элементе
    const getItemData = (idItem) => {
        let idCartItem = cartItems.find(i => i.idItem === idItem)
        idCartItem = idCartItem && idCartItem.idCartItem
        let idFavItem = favorites.find(i => i.idItem === idItem)
        idFavItem = idFavItem && idFavItem.favId
        const item = items.find(i => i.idItem === idItem)

        return {item, idCartItem, idFavItem}
    }


    const onAddItemToCart = async (idItem) => {
        // Добавляем элемент в корзину, если его ещё там не было, иначе убираем
        let {idCartItem} = getItemData(idItem)

        try {
            if (idCartItem) {
                setCartItems(prev => [...prev.filter((val) => val.idCartItem !== idCartItem)])
                await axios.delete(urlAPI + 'cart/' + idCartItem)
            } else {
                const {data} = await axios.post(urlAPI + 'cart', {idItem})
                setCartItems(prev => [...prev, {idItem, idCartItem: data.idCartItem}])
            }
        } catch (e) {
            alert('Ошибка при добавлении в корзину')
        }
    }


    const onAddItemToFav = async (idItem) => {
        // Добавляем элемент в избранное, если его ещё там не было, иначе убираем
        let {idFavItem} = getItemData(idItem)

        try {
            if (idFavItem) {
                setFavorites(prev => [...prev.filter((val) => val.favId !== idFavItem)])
                await axios.delete(urlAPI + 'favorites/' + idFavItem)
            } else {
                const {data} = await axios.post(urlAPI + 'favorites', {idItem})
                setFavorites(prev => [...prev, {idItem, favId: data.favId}])
            }
        } catch (e) {
            alert('Не удалось добавить в избранное')
        }
    }


    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                setCartItems,
                favorites,
                orders,
                onAddItemToFav,
                onAddItemToCart,
                getItemData,
                setShowDrawer
            }}>

            <div className="wrapper">
                <Drawer opened={showDrawer}/>
                <Header/>

                <Routes>
                    <Route exact path={'/'}
                           element={<Home isLoading={isLoading}/>}
                    />
                    <Route path={'/favorites'}
                           element={<Favorites isLoading={isLoading}/>}
                    />
                    <Route path={'/orders'}
                           element={<Orders isLoading={isLoading}/>}
                    />
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
