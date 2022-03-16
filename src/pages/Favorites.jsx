import React from 'react';
import Card from "../components/Card/Card";
import {useFav} from "../hooks/useFav";
import Info from "../components/Info/Info";
import ordersEmptyPic from "../img/pic__orders-empty.png";
import {useNavigate} from "react-router-dom";
import TitlePage from "../components/TitlePage/TitlePage";

const Favorites = ({isLoading}) => {
    let {favorites} = useFav()
    const navigate = useNavigate();


    const favEmpty = () => {
        return (
            <Info
                title={'Закладок нет :('}
                description={'Вы ничего не добавляли в закладки'}
                btnTxt={"Вернуться на главную"}
                onClick={() => navigate(`/`)}
                image={ordersEmptyPic}
            />
        )
    }


    const renderItems = () => {
        favorites = favorites.map((i) => i.item)
        return (isLoading ? [...Array(8)] : favorites).map((favItem, index) => (
            <Card key={isLoading ? index : favItem.idItem}
                  isLoading={isLoading}
                  idItem={favItem && favItem.idItem}
            />
        ))
    }


    return (
        <div className="content">
            <div className={"titleAndSearch"}>
                {TitlePage({title: "Избранное", path: `/`})}
            </div>
            <div className="favItems">
                {favorites.length > 0 ? renderItems() : favEmpty()}
            </div>
        </div>
    );
};

export default Favorites;