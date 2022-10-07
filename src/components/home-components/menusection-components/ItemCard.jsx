import React from 'react';
import { baseURL } from '../../../App';

function ItemCard(props) {
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 text-center my-3">
            <form action={props.action === "/item/" ? baseURL + props.action + props.item._id : baseURL + props.action + props.item.name} method="post">
                <button className="btn btn-outline-danger w-75 item-card shadow">
                    <img className="my-3 home-item-img" src={props.item.img} alt="item-img" />
                    <h2 className="fw-semibold mx-2 my-4">{props.item.name}</h2>
                </button>
            </form>
        </div>
    );
}

export default ItemCard;