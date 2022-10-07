import React from "react";
import { baseURL, sendData } from "../../App";
import NavItem from "./navbar-components/NavItem";

function NavBar(props) {
    const logoStyle = {
        width: "3.5em",
        height: "3.5em",
        borderRadius: "0.75em",
    };

    const titleTextStyle = {
        margin: "0.25em",
        fontWeight: "bold",
    };

    function logout() {
        sendData(baseURL + "/superadmin/logout", {});
    }

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
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <NavItem href="/superadmin" onClick={logout} text="Logout" />
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
