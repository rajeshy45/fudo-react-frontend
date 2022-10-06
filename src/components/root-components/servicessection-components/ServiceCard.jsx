import React from 'react';

function ServiceCard(props) {
    return (
        <div className="col-lg-4 col-md-12 col-sm-12">
            <img className="service-img" src={props.img} alt={props.text} />
                <h1 className="service-text">{props.text}</h1>
        </div>
    );
}

export default ServiceCard;
