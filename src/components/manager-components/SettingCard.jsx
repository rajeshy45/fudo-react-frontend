import React from "react";
import { Link } from "react-router-dom";

function SettingCard(props) {
    const titleStyle = {
        fontWeight: "bold",
        margin: "25px",
    };

    return (
        <div className="col col-lg-3 col-md-4 col-sm-12 text-center">
            <Link to={props.url}>
                <button
                    type="button"
                    className="btn btn-outline-danger setting-button text-white shadow"
                >
                    {props.badgeValue !== null && (
                        <h5 className="text-end">
                            <span class="badge rounded-pill p-2 bg-danger">
                                {String(props.badgeValue)}
                            </span>
                        </h5>
                    )}
                    <img src={props.img} alt="setting-icon" />
                    <h3 style={titleStyle}>{props.title}</h3>
                </button>
            </Link>
        </div>
    );
}

export default SettingCard;
