import React from "react";
import { useParams } from "react-router-dom";
import ItemsSection from "../components/menu-components/ItemsSection";
import NavBar from "../components/menu-components/NavBar";
import SearchBar from "../components/menu-components/SearchBar";
import FooterSection from "../components/root-components/FooterSection";
import Modal from "../components/menu-components/Modal";
import LoginForm from "../components/menu-components/modal-components/LoginForm";
import SignupForm from "../components/menu-components/modal-components/SignupForm";

function Menu() {
    const { searchString } = useParams();

    const [search, setSearch] = React.useState(searchString || "");

    function handleInput(event) {
        const value = event.target.value;

        setSearch(value);
    }

    const titleTextStyle = {
        margin: "0.25em",
        fontWeight: "bold",
        textAlign: "center",
        color: "#FF4646",
    };

    return (
        <div id="menu-page">
            <Modal id="loginModal" form={<LoginForm />} />
            <Modal id="signupModal" form={<SignupForm />} />
            <NavBar />
            <h1 style={titleTextStyle} className="fs-1">
                Menu
            </h1>
            <SearchBar search={search} onChange={handleInput} />
            <hr className="menu-divider" />
            <ItemsSection search={search} />
            <FooterSection />
        </div>
    );
}

export default Menu;
