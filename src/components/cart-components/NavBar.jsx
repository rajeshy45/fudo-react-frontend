import React from "react";
import NavItem from "./navbar-components/NavItem";
import { GetUser } from "../../App";

function NavBar(props) {
    function submitForm() {
        document.getElementById("logout-form").submit();
    }

    const logoStyle = {
        width: "3.5em",
        height: "3.5em",
        borderRadius: "0.75em",
    };

    const titleTextStyle = {
        margin: "0.25em",
        fontWeight: "bold",
    };

    return (
        <nav style={{ padding: "1em" }} className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand " href="/">
                    <img
                        style={logoStyle}
                        src="images/logo.png"
                        alt="logo"
                        className="d-inline-block align-text-center"
                    />
                </a>
                <span style={titleTextStyle} className="fs-2">
                    Fudo
                </span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <NavItem text="Home" href="/" />
                        <NavItem text="Menu" href="/menu" />
                        <form
                            className="d-flex search py-3 mx-2 pb-4"
                            role="search"
                            action="/search"
                            method="post"
                        >
                            <input
                                name="search"
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                            />
                            <button
                                className="btn btn-outline-danger"
                                type="submit"
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>
                        <li className="nav-item dropdown dd">
                            <a
                                className="nav-link dropdown-toggle"
                                href="/home"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {GetUser().fname}
                            </a>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <li>
                                    <a className="dropdown-item" href="/">
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/orders">
                                        Orders
                                    </a>
                                </li>
                                <li>
                                    <form
                                        id="logout-form"
                                        action="/user/logout"
                                        method="post"
                                    >
                                        <a
                                            className="dropdown-item"
                                            href={props.href}
                                            onClick={submitForm}
                                        >
                                            Logout
                                        </a>
                                    </form>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
