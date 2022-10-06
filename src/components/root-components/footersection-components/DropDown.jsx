import React from 'react';

function DropDown(props) {
    return (
        <div className="dropdown">
            <button className="btn btn-outline-light dropdown-toggle dd-btn" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                {props.name}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {
                    props.items.map((item, index) => {
                        return (
                            <li key={index}><a className="dropdown-item" href="/">{item}</a></li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default DropDown;