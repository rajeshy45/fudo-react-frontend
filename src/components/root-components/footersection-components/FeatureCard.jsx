import React from 'react';

function FeatureCard(props) {
    return (
        <div className="col col-lg-3 col-md-6 col-sm-12 p-3">
            <img className="af-img" src={props.img} alt="rating" />
                <h1 className="af-text">{props.text}</h1>
        </div>
    );
}

export default FeatureCard;