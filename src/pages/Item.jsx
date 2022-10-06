import React from "react";
import NavBar from "../components/item-components/NavBar";
import ItemSection from "../components/item-components/ItemSection";
import Modal from "../components/item-components/Modal";
import LoginForm from "../components/item-components/modal-components/LoginForm";
import SignupForm from "../components/item-components/modal-components/SignupForm";
import FooterSection from "../components/root-components/FooterSection";

function Item() {
    
    return (
        <div style={{ overflow: "hidden" }} id="item-page">
            <Modal id="loginModal" form={<LoginForm />} />
            <Modal id="signupModal" form={<SignupForm />} />
            <NavBar />
            <ItemSection />
            <FooterSection />
        </div>
    );
}
export default Item;