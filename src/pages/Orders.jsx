import React from "react";
import NavBar from "../components/home-components/NavBar";
import Loading from "../components/Loading";
import { Navigate } from "react-router-dom";
import OrdersSection from "../components/orders-components/OrdersSection";
import FooterSection from "../components/root-components/FooterSection";
import { baseURL } from "../App";


const navBarLinks = [
    {
        text: "Home",
        href: "/",
    },
    {
        text: "Menu",
        href: "/menu",
    },
];


function Orders() {

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
        <div>
            <NavBar links={navBarLinks} />
            <OrdersSection />
            <FooterSection />
        </div>
    );
}

export default Orders;
