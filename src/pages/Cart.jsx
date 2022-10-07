import React from "react";
import NavBar from "../components/cart-components/NavBar";
import ItemsSection from "../components/cart-components/ItemsSection";
import Loading from "../components/Loading";
import { Navigate } from "react-router-dom";
import FooterSection from "../components/root-components/FooterSection";
import { baseURL } from "../App";

function Cart() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        const request = async () => {
            const response = await fetch(baseURL + "/auth/user");
            const json = await response.json();
            setIsLoaded(true);
            setIsAuthenticated(json.isAuthenticated);
            console.log(json);
        };

        request();
    });

    if (!isLoaded) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <section>
            <NavBar />
            <ItemsSection />
            <FooterSection />
        </section>
    );
}

export default Cart;
