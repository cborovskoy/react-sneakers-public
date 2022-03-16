import React from 'react';
import styles from './Card.module.scss'
import btnAddOffIcon from '../../img/icon__btn-plus.svg'
import btnAddOnIcon from '../../img/icon__btn-check.svg'
import btnFavOffIcon from '../../img/icon__fav_off.svg'
import btnFavOnIcon from '../../img/icon__fav_on.svg'
import ContentLoader from "react-content-loader"
import {AppContext} from "../../App";

const Card = ({idItem, isLoading = true}) => {
    const {onAddItemToFav, onAddItemToCart, getItemData} = React.useContext(AppContext)
    const {item, idCartItem, idFavItem} = getItemData(idItem)

    const getLoadingCard = () => {
        return (
            <ContentLoader
                speed={2} width={160} height={187}
                viewBox="0 0 160 187"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="10" ry="10" width="160" height="91"/>
                <rect x="0" y="107" rx="3" ry="3" width="160" height="15"/>
                <rect x="0" y="126" rx="3" ry="3" width="160" height="15"/>
                <rect x="0" y="163" rx="8" ry="8" width="80" height="24"/>
                <rect x="128" y="155" rx="8" ry="8" width="32" height="32"/>
            </ContentLoader>
        )
    }


    const btnAdd = () => {
        return (
            <button
                className={[styles.btnAdd, (idCartItem ? styles.btnAddOn : styles.btnAddOff)].join(' ')}
                onClick={() => onAddItemToCart(idItem)}>
                <img src={idCartItem ? btnAddOnIcon : btnAddOffIcon} alt=""/>
            </button>
        )

    }


    const btnFav = () => {
        return (
            <button
                className={[styles.btnFav, (idFavItem ? styles.btnFavOn : styles.btnFavOff)].join(' ')}
                onClick={() => onAddItemToFav(idItem)}>
                <img src={idFavItem ? btnFavOnIcon : btnFavOffIcon} alt=""/>
            </button>
        )
    }


    return (
        <div className={styles.card}>
            {isLoading ? getLoadingCard() :
                <>
                    {btnFav()}
                    <img width={133} height={112} src={item.image} alt=""/>
                    <h5>{item.title}</h5>
                    <div className={styles.cardBottom}>
                        <div className={styles.cardPrice}>
                            <span>Цена:</span>
                            <b>{item.price} ₽</b>
                        </div>
                        {btnAdd()}
                    </div>
                </>
            }
        </div>
    )
}

export default Card;