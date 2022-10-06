import React from 'react';
import NavBar from "../components/root-components/NavBar";
import MainSection from "../components/root-components/MainSection";
import ServicesSection from "../components/root-components/ServicesSection";
import FooterSection from "../components/root-components/FooterSection";
import Modal from '../components/root-components/Modal';
import LoginForm from '../components/root-components/modal-components/LoginForm';
import SignupForm from '../components/root-components/modal-components/SignupForm';
import Loading from '../components/Loading';
import { Navigate } from "react-router-dom";

function Root() {
    const navBarLinks = [
        {
            href: "#services-section",
            text: "Why Fudo?"
        },
        {
            href: "/menu",
            text: "Menu"
        },
        {
            href: "#",
            text: "Login",
            target: "#loginModal"
        },
        {
            href: "#",
            text: "Signup",
            target: "#signupModal"
        }
    ];

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

        React.useEffect(() => {
            fetch("/auth/user", {method: "GET"})
                .then(data => data.json())
                setIsLoaded(true);
                setIsAuthenticated(data.isAuthenticated);
                console.log(data);
        });

    if (!isLoaded) {
        return <Loading />;
    }

    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

    return (
        <div id="root-div">
            <Modal id="loginModal" form={<LoginForm />} />
            <Modal id="signupModal" form={<SignupForm />} />
            <NavBar links={navBarLinks} />
            <MainSection />
            <ServicesSection />
            <FooterSection />
        </div>
    )
}

export default Root;