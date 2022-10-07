import React from "react";
import NavItem from "./navbar-components/NavItem";
import { baseURL, GetUser } from "./../../App";

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

    const navBarLinks = [
        {
            href: "#",
            text: "Login",
            target: "#loginModal",
        },
        {
            href: "#",
            text: "Signup",
            target: "#signupModal",
        },
    ];

    let user = GetUser();

    return (
        <nav style={{ padding: "1em" }} className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand " href="/">
                    <img
                        style={logoStyle}
                        src="/images/logo.png"
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
                    {user ? (
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <NavItem text="Home" href="/" />
                            <NavItem text="Menu" href="/menu" />
                            <form
                                className="d-flex nav-link p-3"
                                role="search"
                                action={baseURL + "/search"}
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
                                    {user.fname}
                                </a>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="/home"
                                        >
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="/orders"
                                        >
                                            Orders
                                        </a>
                                    </li>
                                    <li>
                                        <form
                                            id="logout-form"
                                            action={baseURL + "/user/logout"}
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
                            <NavItem
                                text={
                                    <i className="fa-solid fa-cart-shopping"></i>
                                }
                                href="/cart"
                            />
                        </ul>
                    ) : (
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <NavItem text="Home" href="/" />
                            <NavItem text="Menu" href="/menu" />
                            <form
                                className="d-flex nav-link"
                                role="search"
                                action={baseURL + "/search"}
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
                            {navBarLinks.map((link, index) => {
                                return (
                                    <NavItem
                                        key={index}
                                        href={link.href}
                                        text={link.text}
                                        toggle={link.toggle}
                                        target={link.target}
                                    />
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
