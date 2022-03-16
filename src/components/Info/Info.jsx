import React from 'react';
import iconArrow from "../../img/icon__arrow.svg";
import styles from "./Info.module.scss"


const Info = ({title, description, image, onClick, btnTxt}) => {
    return (
        <div className={styles.info}>
            <img className={styles.infoPic} src={image} alt="Cart empty"/>
            <h2>{title}</h2>
            <p>{description}</p>
            <button className={styles.greenButton} onClick={onClick}>
                <img src={iconArrow} alt="Arrow"/>
                {btnTxt}
            </button>
        </div>
    );
};

export default Info;