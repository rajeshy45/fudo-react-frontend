import React from 'react';
import ItemCard from './ItemCard';

function TopFoodRow(props) {
    return (
        <div className="top-fudos">
            <h1 className="fw-bold m-5">{props.title}:</h1>
            <div className="row">
                {
                    props.items.map((item, index) => {
                        return (
                            <ItemCard key={index} item={item} action={props.action} />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default TopFoodRow;