import React from 'react';

function SettingCard(props) {
    const titleStyle = {
        fontWeight: "bold",
        margin: "25px"
    };

    return (
        <div className="col col-lg-3 col-md-12 col-sm-12 text-center">
            <button type="button" className="btn btn-outline-danger setting-button text-white shadow" data-bs-toggle="modal" data-bs-target={"#" + props.id}>
            <img src={props.img} alt="setting-icon" />
            <h3 style={titleStyle}>{props.title}</h3>
            </button>
        </div>
    );
}

export default SettingCard;