import React from 'react';
import axios from "axios";

import iconArrow from "../../img/icon__arrow.svg";
import cartEmptyPic from '../../img/pic__cart-empty.png'
import orderCompletePic from '../../img/pic__order-complite.png'

import Info from "../Info/Info";
import {useCart} from "../../hooks/useCart";
import styles from "./Drawer.module.scss"
import {AppContext} from "../../App";
import {urlAPI} from "../../config"

const delay = (ms) => new Promise(((resolve) => setTimeout(resolve, ms)))

const Drawer = ({opened}) => {
    const {cartItems, setCartItems, totalPrice} = useCart()
    let {onAddItemToCart, setShowDrawer} = React.useContext(AppContext)

    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [orderId, setOrderId] = React.useState(null)

    // Убирает скрол при открытии бокового меню
    document.body.style.overflowY = opened ? "hidden" : "scroll"


    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post(urlAPI + 'orders', {items: cartItems.map((i) => i.item)})
            setOrderId(data.id)
            setIsOrderComplete(true)

            for (let i = 0; i < cartItems.length; i++) {
                await axios.delete(urlAPI + 'cart/' + cartItems[i].idCartItem)
                await delay(1000)
            }
            setCartItems([])
        } catch (e) {
            alert('Не удалось создать заказ\n' + e)
        }
        setIsLoading(false)
    }


    return (
        <div onClick={() => setShowDrawer(false)}
             className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}
                 onClick={(e) => e.stopPropagation()}>
                <h2>
                    Корзина
                    <button onClick={() => setShowDrawer(false)}>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.69132 7.22696L6.24252 4.77815L8.69124 2.32944C9.63548 1.38519 8.17106 -0.0792305 7.22681 0.865015L4.7781 3.31373L2.32929 0.864929C1.38526 -0.0791067 -0.0791134 1.38526 0.864922 2.3293L3.31373 4.7781L0.865008 7.22682C-0.0792375 8.17107 1.38518 9.63549 2.32943 8.69124L4.77815 6.24252L7.22695 8.69133C8.17111 9.63549 9.63548 8.17112 8.69132 7.22696Z"
                                fill="#E6E6E6"/>
                        </svg>
                    </button>
                </h2>
                {cartItems.length > 0
                    ?
                    <div className={styles.cartWithItems}>
                        <div className={styles.cartItems}>
                            {cartItems.map((obj) => (
                                <div className={styles.cartItem} key={obj.item.idItem}>
                                    <div
                                        style={{backgroundImage: `url(${obj.item.image})`}}
                                        className={styles.cartItemImg}/>

                                    <div className={styles.itemInfo}>
                                        <p>{obj.item.title}</p>
                                        <b>{obj.item.price} ₽</b>
                                    </div>
                                    <button onClick={() => onAddItemToCart(obj.item.idItem)}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                  d="M7.29993 1.6C7.29993 1.26863 7.56856 1 7.89993 1H12.0999C12.4313 1 12.6999 1.26863 12.6999 1.6V3.79999C14.1333 3.79999 15.5667 3.79999 17 3.79999C17.3314 3.79999 17.6 4.06862 17.6 4.39999C17.6 4.73136 17.3314 4.99999 17 4.99999H16.1429L14.797 18.4597C14.7663 18.7664 14.5082 19 14.1999 19H5.79993C5.49168 19 5.23358 18.7664 5.2029 18.4597L3.85693 4.99999H3.00002C2.66865 4.99999 2.40002 4.73136 2.40002 4.39999C2.40002 4.06862 2.66865 3.79999 3.00002 3.79999C4.43334 3.79999 5.86661 3.79999 7.29993 3.79999V1.6ZM14.9369 4.99999L13.6569 17.8H6.34292L5.06292 4.99999C8.35427 4.99999 11.6456 4.99999 14.9369 4.99999ZM11.4999 3.79999H8.49993V2.2H11.4999V3.79999ZM7.47566 9.02426C7.24135 8.78995 7.24135 8.41005 7.47566 8.17574C7.70998 7.94142 8.08988 7.94142 8.32419 8.17574L9.99993 9.85147L11.6757 8.17574C11.91 7.94142 12.2899 7.94142 12.5242 8.17574C12.7585 8.41005 12.7585 8.78995 12.5242 9.02426L10.8485 10.7L12.5242 12.3757C12.7585 12.6101 12.7585 12.9899 12.5242 13.2243C12.2899 13.4586 11.91 13.4586 11.6757 13.2243L9.99993 11.5485L8.32419 13.2243C8.08988 13.4586 7.70998 13.4586 7.47566 13.2243C7.24135 12.9899 7.24135 12.6101 7.47566 12.3757L9.1514 10.7L7.47566 9.02426Z"
                                                  fill="#D9D9D9"/>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={styles.cartTotalBlock}>
                            <ul>
                                <li>
                                    <span>Итого: </span>
                                    <div/>
                                    <b>{totalPrice} ₽</b>
                                </li>
                                <li>
                                    <span>Налог 5%: </span>
                                    <div/>
                                    <b>{(totalPrice * 0.05).toFixed(2)} ₽</b>
                                </li>
                            </ul>
                            <button disabled={isLoading}
                                    onClick={onClickOrder}
                                    className={styles.greenButton}>
                                Оформить заказ
                                <img src={iconArrow} alt="iconArrow"/>
                            </button>
                        </div>
                    </div>
                    :
                    <Info
                        onClick={() => setShowDrawer(false)}
                        title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
                        image={isOrderComplete ? orderCompletePic : cartEmptyPic}
                        btnTxt={'Вернуться назад'}
                        description={isOrderComplete
                            ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                            : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                    />
                }
            </div>
        </div>
    );
};

export default Drawer;