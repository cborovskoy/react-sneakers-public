import React from 'react';
import {AppContext} from "../App";
import Card from "../components/Card/Card";
import Info from "../components/Info/Info";
import ordersEmptyPic from '../img/pic__orders-empty.png'
import {useNavigate} from "react-router-dom";
import TitlePage from "../components/TitlePage/TitlePage";


const Orders = ({isLoading}) => {
    const {orders} = React.useContext(AppContext)
    const navigate = useNavigate();


    const ordersEmpty = () => {
        return (
            <Info
                onClick={() => navigate(`/`)}
                title={'У вас нет заказов'}
                description={'После того как вы оформите заказ, он появится тут'}
                btnTxt={"Вернуться на главную"}
                image={ordersEmptyPic}
            />

        )
    }

    const renderOrder = (order) => {
        return (isLoading ? [...Array(4)] : order).map((item, index) => (
                <Card key={isLoading ? index : item.idItem}
                      idItem={item && item.idItem}
                      isLoading={isLoading}
                />
            )
        )
    }


    const renderOrders = () => {
        return (
            (isLoading ? [...Array(1)] : [...orders].reverse()).map((order, index) => (
                <div className={'order'} key={isLoading ? index : order.id}>
                    <h3 style={{color: isLoading ? 'gray' : 'black'}}>
                        {isLoading ? "Загружаем заказы..." : 'Заказ #' + (order && order.id)}
                    </h3>
                    <div className={'orderItems'}>
                        {renderOrder(order && order.items)}
                    </div>
                </div>
            ))
        )
    }


    return (
        <div className="content">
            <div className={"titleAndSearch"}>
                {TitlePage({title: "Мои заказы", path: `/`})}
            </div>
            <div className="orders">
                {orders.length > 0 ? renderOrders() : ordersEmpty()}
            </div>
        </div>
    );
};

export default Orders;