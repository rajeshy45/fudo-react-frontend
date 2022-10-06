import React from 'react';

function FAIconList(props) {
    return (
        <div className="col">
            <h3 className="col-title">{props.title}</h3>
            {
                props.icons.map((icon, index) => {
                    return (
                        <a key={index} href={props.href}><i className={"fa-brands icon fa-" + icon}></i></a>
                    );
                })
            }
        </div>
    );
}

export default FAIconList;