import React from 'react';

function Button(props) {
    return (
        <button className="btn btn-dark download-btn m-3"><i className={"fa-brands fa-" + props.icon}></i> {props.text}</button>
    );
}

export default Button;