import React from 'react';
import style from './TitlePage.module.scss'
import arrowIcon from '../../img/icon__btn_arrow.svg'
import {useNavigate} from "react-router-dom";



const TitlePage = ({title, path}) => {
    const navigate = useNavigate();

    return (
        <div className={style.btnAndTitle}>
            <button className={style.btnBack} onClick={() => navigate(path)}>
                <img src={arrowIcon} alt=""/>
            </button>
            <h1 className={style.title}>{title}</h1>
        </div>
    );
};

export default TitlePage;