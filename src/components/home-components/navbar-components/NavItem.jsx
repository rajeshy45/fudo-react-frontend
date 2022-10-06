import React from 'react';

function NavItem(props) {
    return (
        <li className="nav-item" style={{ padding: "0.5em 1.5em" }}>
            <a className="nav-link" aria-current="page" href={props.href}>{props.text}</a>
        </li>
    );
}

export default NavItem;