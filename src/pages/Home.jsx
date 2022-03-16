import React from 'react';
import iconSearch from "../img/icon__search.svg";
import Card from "../components/Card/Card";
import {AppContext} from "../App";

const Home = ({isLoading}) => {

    const {items} = React.useContext(AppContext)

    const [searchValue, setSearchValue] = React.useState('')
    const onChangeSearchInput = (event) => setSearchValue(event.target.value)

    const renderItems = () => {
        const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
            <Card key={isLoading ? index : item.idItem}
                  isLoading={isLoading}
                  idItem={item && item.idItem}

            />
        ))
    }


    return (
        <div className="content">
            <div className={"titleAndSearch"}>
                <h1>{searchValue ? `Поиск «${searchValue}»` : 'Все кроссовки'}</h1>
                <div className="searchBlock">
                    <img src={iconSearch} alt="Search"/>
                    {searchValue &&
                        <button className={'btnClearSearch'} onClick={() => setSearchValue('')}>
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.69132 7.22696L6.24252 4.77815L8.69124 2.32944C9.63548 1.38519 8.17106 -0.0792305 7.22681 0.865015L4.7781 3.31373L2.32929 0.864929C1.38526 -0.0791067 -0.0791134 1.38526 0.864922 2.3293L3.31373 4.7781L0.865008 7.22682C-0.0792375 8.17107 1.38518 9.63549 2.32943 8.69124L4.77815 6.24252L7.22695 8.69133C8.17111 9.63549 9.63548 8.17112 8.69132 7.22696Z"
                                    />
                            </svg>
                        </button>
                    }

                    <input onChange={onChangeSearchInput}
                           placeholder={"Поиск..."}
                           value={searchValue}/>
                </div>
            </div>

            <div className="sneakers">
                {renderItems()}
            </div>
        </div>
    );
};

export default Home;