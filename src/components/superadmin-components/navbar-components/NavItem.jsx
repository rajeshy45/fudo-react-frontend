import React from 'react';

function NavItem(props) {
    return (
        <li className="nav-item" style={{ padding: "20px 50px" }}>
            <a onClick={props.onClick} className="nav-link fs-5" aria-current="page" href={props.href}>{props.text}</a>
        </li>
    );
}

export default NavItem;